import { visit } from 'unist-util-visit';
import yaml from 'js-yaml';
import { valueToEstree } from 'estree-util-value-to-estree';

/**
 * Remark plugin to transform :::cards blocks into <DocCards /> components
 */
export function remarkCards() {
  return (tree, file) => {
    let hasCards = false;

    // 1. Visit containerDirective nodes
    visit(tree, (node, index, parent) => {
      if (node.type === 'containerDirective' && node.name === 'cards') {
        hasCards = true;
        const items = [];

        // Try to find list items inside the directive
        // Case 1: The content is parsed as a List
        const list = node.children.find(n => n.type === 'list');
        
        if (list) {
          list.children.forEach(listItem => {
            // Each list item text content is a YAML object string
            // "title: ...\ndesc: ..."
            // We extract the text from the list item's children (usually paragraphs)
            const text = listItem.children
              .map(child => {
                if (child.type === 'paragraph') {
                  return child.children.map(c => c.value || '').join('');
                }
                return '';
              })
              .join('\n');

            try {
              // Parse the text as YAML object
              const item = yaml.load(text);
              if (item && typeof item === 'object') {
                items.push(item);
              }
            } catch (e) {
              console.warn('[remark-cards] Failed to parse card item:', text);
            }
          });
        } else {
          // Case 2: The content is parsed as Paragraphs (maybe user didn't use list syntax)
          // Or maybe they pasted a raw YAML list?
          // If it's a raw YAML list, it might be parsed as paragraphs.
          // Let's try to grab all text and parse as a full YAML list.
          const text = node.children
            .map(child => {
               if (child.type === 'paragraph') {
                 return child.children.map(c => c.value || '').join('');
               }
               return '';
            })
            .join('\n');
            
          try {
            const parsed = yaml.load(text);
            if (Array.isArray(parsed)) {
              items.push(...parsed);
            }
          } catch (e) {
             // ignore
          }
        }

        // Construct the AST node for <DocCards items={items} />
        const mdxNode = {
          type: 'mdxJsxFlowElement',
          name: 'DocCards',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'items',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify(items),
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: valueToEstree(items)
                      }
                    ],
                    sourceType: 'module'
                  }
                }
              }
            }
          ],
          children: []
        };

        // Replace the directive node with the MDX component node
        parent.children[index] = mdxNode;
      }
    });

    // 2. Inject import if cards were found
    if (hasCards) {
      const importNode = {
        type: 'mdxjsEsm',
        value: "import DocCards from '/src/components/DocCards.astro';",
        data: {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ImportDeclaration',
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
                    local: { type: 'Identifier', name: 'DocCards' }
                  }
                ],
                source: { type: 'Literal', value: '/src/components/DocCards.astro', raw: "'/src/components/DocCards.astro'" }
              }
            ],
            sourceType: 'module'
          }
        }
      };
      
      tree.children.unshift(importNode);
    }
  };
}

import { visit } from 'unist-util-visit';

export function remarkCodeGroup() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective' && node.name === 'code-group') {
                const data = node.data || (node.data = {});
                data.hName = 'div';
                data.hProperties = {
                    class: 'code-group',
                    'data-code-group': ''
                };

                const tabs = [];
                const panels = [];
                let tabIndex = 0;

                for (const child of node.children) {
                    if (child.type === 'containerDirective' && child.name === 'code') {
                        const title = child.attributes?.title || `Tab ${tabIndex + 1}`;
                        tabs.push({
                            title,
                            id: `tab-${tabIndex}`,
                            panelId: `panel-${tabIndex}`
                        });

                        // Turn child into the panel div
                        const childData = child.data || (child.data = {});
                        childData.hName = 'div';
                        childData.hProperties = {
                            class: `code-group__panel ${tabIndex === 0 ? 'active' : ''}`,
                            role: 'tabpanel',
                            id: `panel-${tabIndex}`,
                            'aria-labelledby': `tab-${tabIndex}`,
                            style: tabIndex === 0 ? '' : 'display: none;'
                        };

                        panels.push(child);
                        tabIndex++;
                    }
                }

                // Build the tabList using proper mdast nodes with hName
                const tabList = {
                    type: 'paragraph',
                    data: {
                        hName: 'div',
                        hProperties: {
                            class: 'code-group__tabs',
                            role: 'tablist'
                        }
                    },
                    children: tabs.map((tab, i) => ({
                        type: 'text',
                        value: tab.title,
                        data: {
                            hName: 'button',
                            hProperties: {
                                class: `code-group__tab ${i === 0 ? 'active' : ''}`,
                                role: 'tab',
                                id: tab.id,
                                'aria-controls': tab.panelId,
                                'aria-selected': i === 0 ? 'true' : 'false',
                                tabindex: i === 0 ? '0' : '-1'
                            }
                        }
                    }))
                };

                // Replace children of code-group
                node.children = [tabList, ...panels];
            }
        });
    };
}

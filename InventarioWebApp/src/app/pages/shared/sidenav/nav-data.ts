import { INavbarData } from "./helps";

export const navbarData: INavbarData[] = [
    {
        url: 'dashboard',
        icon: 'fa fa-home',
        name: 'Dashboard'
    },
    {
        url: 'products',
        icon: 'fa fa-eye',
        name: 'Products'
    },
    {
        url: 'statistics',
        icon: 'fa fa-eye',
        name: 'Statistics'
    },
    {
        url: 'coupens',
        icon: 'fa fa-tags',
        name: 'Coupens',
        items: [
            {
                url: 'coupens/list',
                name: 'List Coupens',
            },
            {
                url: 'coupens/list',
                name: 'List Coupens v1',
                items:[
                    {
                        url: 'coupens/list',
                        name: 'List Coupens',
                    },
                    {
                        url: 'coupens/list',
                        name: 'List Coupens v2',
                        items:[
                            {
                                url: 'coupens/list',
                                name: 'List Coupens',
                            },
                            {
                                url: 'coupens/list',
                                name: 'List Coupens v3',
                                items:[
                                    {
                                        url: 'coupens/list',
                                        name: 'List Coupens',
                                    },
                                    {
                                        url: 'coupens/list',
                                        name: 'List Coupens v4',
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        url: 'pages',
        icon: 'fa fa-file',
        name: 'Pages'
    },
    {
        url: 'media',
        icon: 'fa fa-camera',
        name: 'Media',
        items:[
            {
                url: 'coupens/list',
                name: 'List Media',
            },
            {
                url: 'coupens/list',
                name: 'List Media v1',
            },
        ]
    },
    {
        url: 'settings',
        icon: 'fa fa-cog',
        name: 'Settings'
    },
];
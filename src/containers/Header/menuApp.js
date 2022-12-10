export const adminMenu = [
    { //Quản lí người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin',
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }
        ]
    },
    { //Quản lí phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/mamage-clinic',
            },
        ]
    },
    { //Quản lí chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //Quản lí bài đăng
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/mamage-handbook',
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lí doctor
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
        ]

    }

];
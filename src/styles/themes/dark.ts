import { Colors } from '../common';

const darkTheme = {
    background: {
        primary: Colors.BLUE_DARK,
        secondary: Colors.GRAY,
        tertiary: Colors.PURPLE_NAVY,
        quaternary: Colors.YANKEES_BLUE,
    },
    textColor: {
        primary: Colors.WHITE,
        secondary: Colors.CYAN,
        tertiary: Colors.GRAY,
    },
    borderColor: {
        primary: Colors.GRAY,
        secondary: Colors.PURPLE_NAVY,
    },
    link: {
        textColor: {
            primary: Colors.CYAN,
            secondary: Colors.WHITE,
        },
    },
    button: {
        background: {
            primary: Colors.PURPLE_NAVY,
            secondary: Colors.METALLIC_BLUE,
        },
        textColor: {
            primary: Colors.WHITE,
            secondary: Colors.GRAY,
        },
        borderColor: {
            primary: Colors.METALLIC_BLUE,
        },
    },
    error: {
        background: {
            primary: Colors.DARK_GRAY,
        },
        textColor: {
            primary: Colors.RED,
        },
        borderColor: {
            primary: Colors.RED,
        },
    },
    warning: {
        background: {
            primary: Colors.DARK_GRAY,
            secondary: Colors.GRAY,
        },
        textColor: {
            primary: Colors.ORANGE,
            secondary: Colors.DARK_ORANGE,
        },
        borderColor: {
            primary: Colors.ORANGE,
        },
    },
    toastMessages: {
        success: {
            background: {
                primary: Colors.GREEN,
                secondary: Colors.LIGHT_GREEN,
                tertiary: Colors.DARK_GREEN,
            },
            textColor: {
                primary: Colors.BLACK,
            },
        },
        info: {
            background: {
                primary: Colors.BLUE_DARK,
                secondary: Colors.LIGHT_BLUE,
                tertiary: Colors.BLUE,
            },
            textColor: {
                primary: Colors.BLACK,
            },
        },
        warning: {
            background: {
                primary: Colors.ORANGE,
                secondary: Colors.LIGHT_ORANGE,
                tertiary: Colors.DARK_ORANGE,
            },
            textColor: {
                primary: Colors.BLACK,
            },
        },
        error: {
            background: {
                primary: Colors.RED,
                secondary: Colors.LIGHT_RED,
                tertiary: Colors.DARK_RED,
            },
            textColor: {
                primary: Colors.BLACK,
            },
        },
    },
};

export default darkTheme;

import { Colors } from '../common';

const darkTheme = {
    background: {
        primary: Colors.CETACEAN_BLUE,
        secondary: Colors.GRAY,
        tertiary: Colors.RICH_BLACK,
        quaternary: Colors.YANKEES_BLUE,
    },
    textColor: {
        primary: Colors.WHITE,
        secondary: Colors.CYAN,
        tertiary: Colors.LIGHT_GRAY,
    },
    borderColor: {
        primary: Colors.GRAY,
        secondary: Colors.PURPLE_NAVY,
        tertiary: Colors.LIGHT_GRAY,
        quaternary: Colors.CYAN,
    },
    link: {
        textColor: {
            primary: Colors.CYAN,
            secondary: Colors.WHITE,
            tertiary: Colors.GRAY,
        },
    },
    button: {
        background: {
            primary: Colors.GRAY,
            secondary: Colors.CYAN,
        },
        textColor: {
            primary: Colors.WHITE,
            secondary: Colors.CETACEAN_BLUE,
        },
        borderColor: {
            primary: Colors.GRAY,
            secondary: Colors.CYAN,
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
        },
        textColor: {
            primary: Colors.ORANGE,
            secondary: Colors.DARK_ORANGE,
        },
        borderColor: {
            primary: Colors.ORANGE,
        },
    },
    chart: {
        positive: Colors.GREEN,
        negative: Colors.RED,
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
                primary: Colors.DARK_BLUE,
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
                secondary: Colors.WHITE,
            },
        },
    },
};

export default darkTheme;

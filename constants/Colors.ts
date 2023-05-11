const tintColorLight = '#30BE76';
const tintColorDark = '#30BE76';

export default {
  light: {
    text: '#000',
    textMuted: '#A8A8A8',
    textMuted2: '#606060',
    icon: '#363837',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    card:'rgba(255, 255, 255, 0.5)',
    avatarBackground:'#ccc',
    borderSeparator: 'rgba(0, 0, 0, 0.2)',
  },
  dark: {
    text: '#fff',
    textMuted: '#A8A8A8',
    textMuted2: '#606060',
    background: 'rgba(48, 190, 118, 0.08)', //'rgba(18, 18, 18, 1)',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    card:'rgba(48, 190, 118, .05)',
    avatarBackground:'#ccc'
  },
};

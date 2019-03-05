const MB = 1024 * 1024;

export default {
    server: process.env.NODE_ENV === 'development' ? '//192.168.27.157:9200' : '',

    maxImageSize: MB * 3,
    maxFileSize: MB * 300,
    maxBackgroundImageSize: MB * 5,
    maxAvatarSize: MB * 1.5,

    // client default system setting
    primaryColor: '74, 144, 226',
    primaryTextColor: '247, 247, 247',
    backgroundImage: require('@/assets/images/background.jpg'),
    sound: 'default',
};

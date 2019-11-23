import Server from './config/Server';

const init = async () => {    
    await Server.start();
    console.log('Server runnig on 3000');
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
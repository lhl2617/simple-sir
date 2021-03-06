import * as React from 'react';
import styles from './Footer.module.css';


export class Footer extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.box}>
                    <div className={styles.coffee}>
                        <a href="https://www.buymeacoffee.com/8hwXuMlt3" rel="noopener noreferrer" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/yellow_img.png" alt="Buy Me A Coffee" /></a>
                    </div>
                    <h5>
                        Simple Interactive SIR Model
                    </h5>
                    <h5>
                        Created by L.H. Lee
                    </h5>
                    <span>
                       <a rel="noopener noreferrer" href="mailto:l.h.lee2617@gmail.com">Email</a> | <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/linhaolee/">LinkedIn</a>
                    </span>
                </div>
            </div>
        );
    };
}

export default Footer;
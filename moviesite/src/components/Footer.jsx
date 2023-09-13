import Facebook from '../assets/svgs/facebook.svg'
import Insta from '../assets/svgs/instagram.svg'
import Twitter from '../assets/svgs/twitter.svg'
import Youtube from '../assets/svgs/youtube.svg'

export default function Footer(){
    return(
        <section className="footer">
            <div className="footerSocials">
                <img src={Facebook} />
                <img src={Insta} />
                <img src={Twitter} />
                <img src={Youtube} />
            </div>
            <div className="footerTexts">
                <p>Conditions of Use</p>
                <p>Privacy & Policy</p>
                <p>Press Room</p>
            </div>
            <div className="footerCopyright">
                <p>&copy; {new Date().getFullYear()} MovieBox by Sarafa Abbas</p>
            </div>
        </section>
    )
}
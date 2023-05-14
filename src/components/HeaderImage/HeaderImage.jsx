import styles from "./HeaderImage.module.scss";

const HeaderImage = (props) => {

    return (
        <div><img src={props.headerImage} alt="Image"/></div>
    );
}

export default HeaderImage;
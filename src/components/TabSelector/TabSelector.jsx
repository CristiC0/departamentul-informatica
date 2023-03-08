import { useState } from "react";
import styles from "./TabSelector.module.scss";

const TabSelector = (props) => {
    const { selectOptions } = props;

    const [selected, setSelected] = useState(0);

    return (
        <div className={styles["tabs"]}>
            {selectOptions.map((option, index) => (
                <span
                    className={
                        index === selected ? styles["tabs--selected"] : ""
                    }
                    onClick={() => setSelected(index)}
                    key={option.title}
                >
                    {option.title}
                </span>
            ))}
        </div>
    );
};

export default TabSelector;

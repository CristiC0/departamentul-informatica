import { useTranslation } from "react-i18next";

const CurrentDate = () => {
    const { t } = useTranslation();

    let days = [t("sun"), t("mon"), t("tues"), t("wed"), t("thur"), t("fry"), t("sat")];
    let months = [t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("june"), t("july"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec")];

    const current = new Date();
    const day= current.getDay();
    const date=current.getDate();
    const month=current.getMonth();
    const year=current.getFullYear();

    const current_date =`${days[day]}, ${date} ${months[month]}, ${year}`;
 
    return (<div>{current_date}</div>);
}

export default CurrentDate;
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import styles from "./language-selector.module.scss";

const {
    container,
    dropDown,
    buttonToggle,
    icon,
    dropDownMenu,
    dropDownMenuItem,
    buttonLabel,
} = styles;

export default function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const languages = [
        { code: "en", name: t("english") },
        { code: "fr", name: t("french") },
    ];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore comment
    const handleLanguageChange = event => {
        const langCode = event.target.getAttribute("data-value");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [setSelectedLanguage] = useState(languages[0].code);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore comment
        setSelectedLanguage(langCode);
        i18n.changeLanguage(langCode);
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={container}>
            <div
                className={dropDown}
                onMouseEnter={handleOpen}
                onMouseLeave={handleOpen}
            >
                <button
                    className={buttonToggle}
                    onClick={handleOpen}
                    type="button"
                >
                    <span className={buttonLabel}>
                        {i18n.language === "en" ? t("english") : t("french")}
                    </span>
                    <FontAwesomeIcon className={icon} icon={faGreaterThan} />
                </button>
                {open && (
                    <ul className={dropDownMenu}>
                        {languages.map(language => (
                            <li
                                className={dropDownMenuItem}
                                key={language.code}
                                data-value={language.code}
                                onClick={handleLanguageChange}
                                aria-hidden="true"
                            >
                                {language.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

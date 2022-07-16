import React from 'react'
import styles from './AppInfo.css'

const AppInfo = () => {
    return (
        <div className={styles.block}>
            <h1 className={styles.headerText}>Приложения акций</h1>
            <p className={styles.text}>
                Что нужно учитывать при выборе приложения для торговли акциями? Решая, какое приложение лучше всего подходит для
                вас, учитывайте следующее: Уровень знаний - вы начинающий или опытный трейдер? Сборы - каковы сборы и комиссии за
                использование этого приложения? Доступные платформы - предлагается ли ваша любимая мобильная платформа, или вам
                нужно использовать настольный компьютер? Простота использования - насколько легко будет начать торговать с помощью
                этого приложения,
            </p>
        </div>
    )
}

export default AppInfo
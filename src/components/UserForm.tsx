import React, { useState, useRef, useCallback, useMemo } from 'react';
import useFormValidation from './UseFormValidation';
import '../app.css';

const UserForm: React.FC = () => {
    // хук useState для хранения значений полей формы
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    // пользовательский хук для валидации формы
    const validationResult = useFormValidation(name, email, password);

    // хук useRef для ссылки на элементы формы
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // хук useMemo для мемоизации результатов валидации
    const isFormValid = useMemo(() => {
        return validationResult.name && validationResult.email && validationResult.password;
    }, [validationResult]);

    // хук useCallback для оптимизации функций-обработчиков
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    // хук useCallback для обработки отправки формы
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);

        // установка фокуса на первом невалидном поле при отправке формы
        if (!validationResult.name) {
            nameRef.current?.focus();
        } else if (!validationResult.email) {
            emailRef.current?.focus();
        } else if (!validationResult.password) {
            passwordRef.current?.focus();
        } else {
            alert('Форма успешно отправлена');
        }
    }, [validationResult]);

    // форма с полями для ввода имени, почты и пароля и кнопкой отправки
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Имя:
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        ref={nameRef}
                    />
                </label>
                {formSubmitted && !validationResult.name && (
                    <div className="error">Имя должно содержать хотя бы 3 символа</div>
                )}
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        ref={emailRef}
                    />
                </label>
                {formSubmitted && !validationResult.email && (
                    <div className="error">Введите правильный email</div>
                )}
            </div>
            <div>
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        ref={passwordRef}
                    />
                </label>
                {formSubmitted && !validationResult.password && (
                    <div className="error">Пароль должен быть не менее 6 символов</div>
                )}
            </div>
            <button
                type="submit"
                className={isFormValid ? 'valid' : 'invalid'
                    /* При невалидной форме кнопка не disabled, а просто другого цвета, потому что иначе не получится 
                    прописать перевод фокуса на первое неверное поле (ну, по крайней мере, я не разобралась, как это сделать)
                    */
                }
            >
                Отправить
            </button>
        </form>
    );
};

export default UserForm;

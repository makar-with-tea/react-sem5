import { useState, useEffect, useCallback } from 'react';

// интерфейс объекта валидации
interface ValidationResult {
  name: boolean;
  email: boolean;
  password: boolean;
}

// пользовательский хук для валидации формы
const useFormValidation = (name: string, email: string, password: string) => {
  // хук useState для хранения состояния валидации полей формы
  const [validationResult, setValidation] = useState<ValidationResult>({
    name: false,
    email: false,
    password: false,
  });

  // хук useCallback для валидации имени
  const validateName = useCallback((name: string) => {
    return name.length >= 3; // Имя должно содержать хотя бы 3 символа
  }, []);

  // хук useCallback для валидации email
  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // регулярное выражение для проверки почты
    return emailRegex.test(email);
  }, []);

  // хук useCallback для валидации пароля
  const validatePassword = useCallback((password: string) => {
    return password.length >= 6; // Пароль должен быть не менее 6 символов
  }, []);

  // хук useEffect для проверки валидности полей формы при изменении их значений
  useEffect(() => {
    setValidation({
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
    });
  }, [name, email, password, validateName, validateEmail, validatePassword]);

  // возврат объекта с результатами валидации всех полей
  return validationResult;
};

export default useFormValidation;
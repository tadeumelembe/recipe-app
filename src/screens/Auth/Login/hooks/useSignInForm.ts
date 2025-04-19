import { useState } from "react";
import { Control, UseFormHandleSubmit, UseFormWatch, useForm } from "react-hook-form";
import { authService } from "../../../../services/auth/authService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebaseConfig";

interface IFormData {
    name: string;
    password: string;
    email: string
}

interface IUseSignUpForm {
    formData: IFormData
}

interface IUseSignUpFormReturn {
    submitForm: (data: IFormData) => Promise<void>,
    handleSubmit: UseFormHandleSubmit<IFormData>;
    control: Control<IFormData>;
    loading: boolean;
    formError: string
}

export function useSignInForm(): IUseSignUpFormReturn {
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const { control, handleSubmit } = useForm<IFormData>({
        defaultValues: {
            email: 'tadeumelembe@gmail.com',
            password: '',
        }
    });

    const submitForm = async (data: IFormData) => {

        setFormError('')
        setLoading(true)

        await authService.login(data)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                const firebaseAuthErros = ['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-email']

                if (firebaseAuthErros.includes(error.code)) return setFormError('Invalid credentials')

                setFormError('Something went wrong, trey again')
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }


    return {
        submitForm,
        handleSubmit,
        control,
        loading,
        formError,
    }
}
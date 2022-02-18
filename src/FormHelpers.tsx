import { TextInput, Label, InputPrefix, FormGroup } from '@trussworks/react-uswds';
import { TextInputProps } from '@trussworks/react-uswds/lib/components/forms/TextInput/TextInput';
import { UseFormRegister } from 'react-hook-form';
import { SignupOptions } from './App';

interface InputProps {
    name: keyof SignupOptions,
    label: string,
    register: UseFormRegister<SignupOptions>,
    type: TextInputProps["type"]
    required: boolean,
}
export const Input = ({ label, register, type, required, name }: InputProps) => {
    const { ref, ...rest } = register(name, { required });

    return (
        <FormGroup>
            <Label htmlFor={name}>{label}</Label>
            <TextInput id={name} type={type} inputRef={ref} {...rest} />
        </FormGroup>
    )
};

export const TelInput = ({ label, register, type, required, name }: InputProps) => {
    const validation = /^\d{10}$/;
    const { ref, ...rest } = register(name, { required, pattern: validation });

    return (
        <FormGroup>
            <Label htmlFor={name}>{label}</Label>
            <div className="usa-input-group">
                <InputPrefix>+1</InputPrefix>
                <TextInput id={name} type={type} inputRef={ref} {...rest} />
            </div>
        </FormGroup>
    )
};

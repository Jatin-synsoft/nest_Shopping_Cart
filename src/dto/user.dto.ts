import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, Max, matches, Min, MaxLength } from 'class-validator';

export class newUserDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    readonly email: string;

    @IsNotEmpty()
    @IsString({ message: 'Password must be a string' })
    readonly password: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty({ message: 'Address cannot be empty' })
    readonly address: string;

    readonly role?: string; // Assuming role is optional
}

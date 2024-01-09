import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class updateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(10, { message: 'Phone number must be at least 10 digits long' })
    readonly phone: number;

    @IsNotEmpty({ message: 'Address cannot be empty' })
    readonly address: string;
}

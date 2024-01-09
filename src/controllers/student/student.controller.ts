import { Controller, Get, Res } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }

    @Get('all')
    fun1() {
        return this.studentService.func1()
    }

    @Get('group')
    fun2() {
        return this.studentService.func2()
    }

    @Get('max_min')
    fun3() {
        return this.studentService.func3()
    }

    @Get('match')
    fun4() {
        return this.studentService.func4()
    }
    
    @Get('grade')
    fun5() {
        return this.studentService.func5()
    }

    @Get('count')
    fun6() {
        return this.studentService.func6()
    }

    @Get('add')
    fun7() {
        return this.studentService.func7()
    }

    @Get('export')
    async exportStudentsCsv() {
        try {
            await this.studentService.exportCsv();

            return { message: 'Students exported to CSV successfully' };
        } catch (error) {
            return { error: 'Failed to export students to CSV', details: error.message };
        }
    }


    
  @Get('export1')
  async exportMongoToCsv(@Res() res: Response): Promise<any> {
  
      return await this.studentService.convertMongoToCsv()

  }
}

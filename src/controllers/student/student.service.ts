import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/Models/students.modal';
import { createWriteStream } from 'fs';
import * as fastCsv from 'fast-csv';
import * as json2csv from 'json2csv';
@Injectable()
export class StudentService {

    constructor(@InjectModel(Student.name) private Student: Model<Student>) { }

    async func1() {

        return this.Student.aggregate([
            {
                $addFields: {
                    totalMarks: {
                        $sum: [
                            "$marks.math",
                            "$marks.science",
                            "$marks.history",
                        ]
                    },
                    average: {
                        $avg: [
                            "$marks.math",
                            "$marks.science",
                            "$marks.history",
                        ]
                    }
                },
            },
            {
                $project: {
                    _id: 1,
                    student_id: 1,
                    name: 1,
                    totalMarks: 1,
                    average: 1,
                    marks: 1
                },
            },
        ])
    }

    async func2() {
        return this.Student.aggregate([
            {
                $group: {
                    _id: "$marks",
                    total: {
                        $sum: {
                            $add: ["$marks.math", "$marks.science", "$marks.history"]
                        }
                    },
                    average: {
                        $avg: {
                            $avg: ["$marks.math", "$marks.science", "$marks.history"]
                        },
                    },

                }
            }, { $sort: { total: -1 } }, { $limit: 50 }
        ]);
    }

    async func3() {
        return this.Student.aggregate([
            {
                $group: {
                    _id: null,
                    minField_history: { $min: '$marks.history' },
                    maxField_history: { $max: '$marks.history' },
                    minField_science: { $min: '$marks.science' },
                    maxField_science: { $max: '$marks.science' },
                    minField_maths: { $min: '$marks.math' },
                    maxField_maths: { $max: '$marks.math' }
                }
            }
        ]);
    }

    async func4() {
        return this.Student.aggregate([
            { $match: { "grade": { $in: ["A", "B"] } } },
            { $sort: { "attendance.attended_classes": -1 } }
        ]);
    }

    async func5() {
        return this.Student.aggregate([{ $match: { grade: "B" } }, { $count: "Total student of grade :B" }])
    }

    async func6() {
        return this.Student.aggregate(
            [
                { $unwind: "$grade" },
                { $sortByCount: "$grade" }
            ]);
    }

    async func7() {
        return this.Student.aggregate(
            [
                {
                    $project: {
                        "name": 1, "grade": 1, "marks": 1, "_id": 0,
                        percentage: {
                            $avg: [
                                "$marks.math",
                                "$marks.science",
                                "$marks.history",
                            ]
                        },
                        average_atd: {
                            $avg: [
                                "$attendance.attended_classes",
                            ]
                        }
                    },
                }, { $skip: 1 },
                { $out: "properties_by_type" },
            ]);
    }

    async exportCsv(): Promise<void> {
        try {
            const students = await this.Student.find().exec();
            const filePath = './students-export.csv';
            const csvStream = fastCsv.format({ headers: true });
            const writableStream = createWriteStream(filePath);

            csvStream.pipe(writableStream);

            students.forEach((student) => {
                const csvRow = {
                    'Student ID': student.student_id,
                    'Name': student.name,
                    'Math Marks': student.marks.math,
                    'Science Marks': student.marks.science,
                    'History Marks': student.marks.history,
                    'Grade': student.grade,
                    'Total Classes': student.attendance.total_classes,
                    'Attended Classes': student.attendance.attended_classes,
                };
                csvStream.write(csvRow);
            });

            await new Promise((resolve, reject) => {
                csvStream
                    .on('finish', resolve)
                    .on('error', reject);
                csvStream.end();
            });

            console.log('CSV exported successfully.');
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    }

    async convertMongoToCsv(): Promise<string> {
        try {
            const students = await this.Student.find().exec();

            if (students.length === 0) {
                return 'No documents found.';
            }

            const fields = [
                'student_id',
                'name',
                'marks.math',
                'marks.science',
                'marks.history',
                'grade',
                'attendance.total_classes',
                'attendance.attended_classes',
            ];

            const csvData = json2csv.parse(students, { fields });

            const filePath = './students-export.csv';

            const writableStream = createWriteStream(filePath);
            writableStream.write(csvData);
            writableStream.end();

            return filePath;
        } catch (error) {
            console.error('Error exporting to CSV:', error);
            throw new Error('Error exporting to CSV');
        }
    }


}

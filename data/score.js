import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Student } from './student.js';

// Sequelize에서 제공하는 데이터 타입을 사용
const DataTypes = SQ.DataTypes;

// 점수 테이블을 생성함
export const Score = sequelize.define(
    'score',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        stu_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        java: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        python: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        C_lang: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total: { type: DataTypes.INTEGER },
        average: { type: DataTypes.INTEGER }
    }
)
Score.beforeCreate((score) => {
    score.total = score.java + score.python + score.C_lang;
    score.average = Math.round(score.total / 3);
});

Score.beforeUpdate((score) => {
    score.total = score.java + score.python + score.C_lang;
    score.average = Math.round(score.total / 3);
});

Score.sync()

// Student와 Score 테이블 join하기
Score.belongsTo(Student)
// 객체를 만들어서 attributes라는 키로 된 배열을 만들고 select~join문을 만들때 보고자하는 컬럼들을 미리 적어서 저장
const INCLUDE_STUDENT = {
    attributes: [
        'id',
        'java',
        'python',
        'C_lang',
        'createdAt',
        'total',
        'average',
        // student에 들어있는 컬럼(한단계 들여써진 내용)을 앞으로 땡겨 쓸 수 있음
        [Sequelize.col('student.stu_num'), 'stu_num'],
        [Sequelize.col('student.stu_name'), 'stu_name'],
        [Sequelize.col('student.stu_hp'), 'stu_hp'],
        [Sequelize.col('student.email'), 'email']
    ],
    // Student와 조인된 내용을 포함해서 findAll할 수 있다.
    include: {
        model: Student,
        attributes: [],
    }
}
// total 점수를 기준으로 내림차순으로 정렬하고, 점수가 동일한 경우 학번을 기준으로 내림차순 하기 위한 코드를 변수로 저장
const ORDER_DESC = {
    order: [
        ['average', 'DESC'],
        ['stu_num', 'DESC']
    ]
}

// 모든 성적 데이터 보여주기
export async function getAll(){
    return Score.findAll({...INCLUDE_STUDENT, ...ORDER_DESC}).then((data) => {
        console.log(data);
        return data;
    })
}


export async function createScore(score) {
    return Score.create(score).then((data) => data.dataValues.id);
    // 받은 data를 dataValues의 id로 넣게됨
}

// 점수 테이블에서 stu_num를 가지고 성적 데이터를 조회하며, stu_id를 기준으로 조인된 학생 정보와 함께 데이터 반환
export async function getByStuNum(stu_num) {
    return Score.findAll({
        ...INCLUDE_STUDENT,
        ...ORDER_DESC,
    include: {
        ...INCLUDE_STUDENT.include,
        where: {stu_num}
    }});
}
//INCLUDE_STUDENT에서 id를 기준으로 찾기
export async function getById(id) {
    console.log("들어옴 getById");
    return Score.findOne({
        where: { id }, ...INCLUDE_STUDENT})
}

export async function create(stu_id, java, python, C_lang) {
    return Score.create({stu_id, java, python, C_lang}).then((data) => {
        console.log(data);
        return data;
    });
}


export async function update(id, java, python, C_lang) {
    return Score.findByPk(id).then((score) => {
        Score.java = java;
        Score.python = python;
        Score.C_lang = C_lang;
        return Score.save();
    })
}

export async function remove(stu_num) {
    return Score.findOne({ where: {stu_num}}).then((score) => {
        score.destroy();
    });
}
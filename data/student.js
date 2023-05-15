import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Score } from './score.js';
import { db } from '../db/database.js';

// Sequelize에서 제공하는 데이터 타입을 사용
const SELECT_JOIN = 'select st.st_num, st.stu_hp, st.stu_hp, st.email, sc.java, sc.python, sc.C_lang, sc.total, sc.average from students as st left outer join scores as sc on st.id = sc.stu_id'
const ORDER_DESC = 'order by sc.average, desc st.stu_num desc'

const DataTypes = SQ.DataTypes; 

// DB에 학생 테이블의 스키마를 정의하고 테이블을 생성함
export const Student = sequelize.define(
    'student',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        stu_num: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        stu_name: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        stu_hp: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        regdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
)
Student.sync()
// Student.belongsTo(Score)
// const INCLUDE_SCORE = {
//     attributes: [
//         'id',
//         'stu_num',
//         'stu_name',
//         'stu_hp',
//         'email',
//         'average'
//         // user에 들어있는 컬럼(한단계 들여써진 내용)을 앞으로 땡겨 쓸 수 있음
//         [Sequelize.col('user.name'), 'name'], //'user.name'컬럼을 name으로 하겠다.  
//         [Sequelize.col('user.username'), 'username'],
//         [Sequelize.col('user.url'), 'url']
//     ],
//     include: {
//         model: Score,
//         attributes: [],
//     }
// }


export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0])
}

// 생성된 학생 정보를 담은 stu 객체를 받아서, Student 테이블 안에 레코드를 생성하고, 해당 데이터의 id값을 반환.
export async function createStu(stu){
    return Student.create(stu).then((data) => data.dataValues.id);
    // 받은 data를 dataValues의 id로 넣게됨
}
export async function findAllStu(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0])
}
//findOne(WHERE 조건)으로 stu_num/id와 같은 것 찾기
export async function findByStuNum(stu_num) {
    return Student.findOne({ where: { stu_num }});
}

export async function findByStuId(id){
    console.log("들어옴 findById");
    return Student.findByPk(id)
}


export async function update(id, stu_name, stu_hp, email) {
    return Student.findByPk(id).then((student) => {
        student.id = id;
        student.stu_name = stu_name;
        student.stu_hp = stu_hp;
        student.email = email;
        return student.save(); 
    })
}

export async function remove(id) {
    return Student.findByPk(id).then((student) => {
        student.destroy();
    });
}
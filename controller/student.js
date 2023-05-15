import * as stuRepository from '../data/student.js';
// import { config } from '../config.js'

// req.body 데이터를 받아 학생을 등록하며, 유니크키로 지정된 학번으로 등록된 학생인지 확인하여 결과를 반환.
export async function signup(req, res) {
    const { stu_num, stu_name, stu_hp, email } = req.body;
    console.log('-------------------------')
    const found = await stuRepository.findByStuNum(stu_num);
    
    console.log(found)
    if(found){
        return res.status(409).json({ message: `${stu_num}은 이미 등록되었습니다!`})
    }
    
    // stuRepository에 생성된 학생의 id값을 반환
    const stuId = await stuRepository.createStu({
        stu_num,
        stu_name,
        stu_hp,
        email
    })
    
    res.status(201).json({ message: `${stu_num} 학생이 새로 등록 되었습니다!`});
    console.log(stuId)
}

export async function searchStu(req, res, next){
    const stu_num = req.query.stu_num; // 값을 받아와서 저장
    const data = await (stu_num
    ? stuRepository.findByStuNum(stu_num): stuRepository.getAll());
    res.status(200).json(data)
}


export async function updateStu(req, res, next){
    const id = req.params.id; // 수정할 id 번호를 저장
    const stu_name = req.body.stu_name; 
    const stu_hp = req.body.stu_hp;
    const email = req.body.email;

    // 입력받은 id로 db에서 찾아 student 변수에 저장
    const student = await stuRepository.findByStuId(id) // 
    if(!student){
        res.status(404).json({message: `student id(${id}) 없음`}) //id가 없으면 없다고 return
    }
    console.log(`----------${req.userId}`);

    const updated = await stuRepository.update(id, stu_name, stu_hp, email);
    res.status(200).json(updated);
}


export async function deleteStu(req, res, next) {
    const id = req.params.id;
    const student = await stuRepository.findByStuId(id);
    if(!student){
        res.status(404).json({message: `student id(${id}) 없음`}) //id가 없으면 없다고 return
    }

    await stuRepository.remove(id);
    res.status(200).json({message: `삭제되었습니다`}); // 정상적으로 되었다면 코드번호를 204로 보내겠다.
}
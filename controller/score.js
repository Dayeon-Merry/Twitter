import * as scoreRepository from '../data/score.js';
import * as stuRepository from '../data/student.js'
// import { config } from '../config.js'

// 학번으로 검색하여 등록된 학생의 모든 성적 정보를 출력한다.
export async function getScores(req, res) {
    const stu_num = req.query.stu_num; // 값을 받아와서 저장
    const data = await (stu_num
    ? scoreRepository.getByStuNum(stu_num): scoreRepository.getAll());
    res.status(200).json(data)
}

export async function createScore(req, res, next) {
    const { java, python, C_lang, stu_id } = req.body;
    //body에서 입력받은 값을 불러와서 변수에 넣겠다.
    const score = await scoreRepository.create(java, python, C_lang, stu_id)
    res.status(201).json(score);
}


export async function updateScore(req, res, next){
    const stu_num = req.query.stu_num; // 수정할 학생의 학번을 저장
    const java = req.body.java; 
    const python = req.body.python;
    const C_lang = req.body.C_lang;

    // 입력받은 학번으로 db에서 찾아 score 변수에 저장
    const student = await stuRepository.findByStuNum(stu_num)  
    if(!student){
        res.status(404).json({message: `stu_num(${stu_num}) 없음`}) //해당 학번의 학생이 없으면 없다고 return
    }

    const updated = await scoreRepository.update(id, java, python, C_lang);
    res.status(200).json(updated);
}


export async function deleteScore(req, res, next) {
    const stu_num = req.query.stu_num; // 점수를 삭제할 학생의 학번을 불러와서 변수에 저장
    const student = await stuRepository.findByStuNum(stu_num);
    if(!student){
        res.status(404).json({message: `student id(${id}) 없음`}) //해당 학번의 학생이 없으면 없다고 return
    }

    await scoreRepository.remove(stu_num);
    res.status(200).json({message: `삭제되었습니다`}); // 정상적으로 되었다면 코드번호를 204로 보내겠다.
}
import dotenv from 'dotenv';

dotenv.config();

// .env에서 key값이 있으면 value 변수에 저장, 없으면 defaultValue 기본값인 undefined를 저장하여 반환. value 값이 null일 때 에러를 발생시켜 처리한다.
function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if(value == null) {
        throw new Error(`Key ${key} is undefined`)
    }
    return value
}

// .env에서 저장한 환경변수를 required()메서드로 불러와서 오류를 방지하기 위함.
export const config = {
    host: {
        port:parseInt(required('SERVER_PORT', 9090))
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD')
    }
}


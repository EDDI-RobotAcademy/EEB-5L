interface Env {
    mode: string | undefined;
    api: {
        KAKAO_AUTH_URL: string | undefined;
        GOOGLE_AUTH_URL: string | undefined;
        NAVER_AUTH_URL: string | undefined;
        GITHUB_AUTH_URL: string | undefined;
        META_AUTH_URL: string | undefined;
    };
    origins: {
        kakao: string[];
        google: string[];
        naver: string[];
        github: string[];
        meta: string[];
    };
}

// env 변수에 들어가는 환경변수명은 .env에 맞춰서 REACT_ 접두사 붙여서 설정
const parseOrigins = (val?: string): string[] =>
    val ? val.split(",").map(s => s.trim()) : [];

const env: Env = {
    mode: process.env.NODE_ENV,
    api: {
        KAKAO_AUTH_URL: process.env.REACT_KAKAO_AUTH_URL,
        GOOGLE_AUTH_URL: process.env.REACT_GOOGLE_AUTH_URL,
        NAVER_AUTH_URL: process.env.REACT_NAVER_AUTH_URL,
        GITHUB_AUTH_URL: process.env.REACT_GITHUB_AUTH_URL,
        META_AUTH_URL: process.env.REACT_META_AUTH_URL,
    },
    origins: {
        kakao: parseOrigins(process.env.REACT_KAKAO_ORIGINS),
        google: parseOrigins(process.env.REACT_GOOGLE_ORIGINS),
        naver: parseOrigins(process.env.REACT_NAVER_ORIGINS),
        github: parseOrigins(process.env.REACT_GITHUB_ORIGINS),
        meta: parseOrigins(process.env.REACT_META_ORIGINS),
    }
};

export default env;
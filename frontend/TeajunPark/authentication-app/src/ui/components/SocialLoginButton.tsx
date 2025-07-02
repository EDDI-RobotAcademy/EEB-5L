import React from "react";
import KakaoIcon from "../../assets/kakao_logo.png";
import GoogleIcon from "../../assets/google_logo.png";
import NaverIcon from "../../assets/naver_logo.png";
import GithubIcon from "../../assets/github_logo.png";
import MetaIcon from "../../assets/meta_logo.png";

type Provider = "kakao" | "google" | "naver" | "github" | "meta";

interface Props {
    provider: Provider;
    onClick?: () => void;
}

const providerConfig: Record<Provider, {
    src: string;
    label: string;
    bgColor: string;
    textColor: string;
    border: string;
}> = {
    kakao: {
        src: KakaoIcon,
        label: "카카오 로그인",
        bgColor: "bg-yellow-300 hover:bg-yellow-400",
        textColor: "text-black",
        border: "border border-yellow-400",
    },
    google: {
        src: GoogleIcon,
        label: "Google 로그인",
        bgColor: "bg-white hover:bg-gray-100",
        textColor: "text-gray-900",
        border: "border border-gray-300",
    },
    naver: {
        src: NaverIcon,
        label: "네이버 로그인",
        bgColor: "bg-green-500 hover:bg-green-600",
        textColor: "text-white",
        border: "border border-green-600",
    },
    github: {
        src: GithubIcon,
        label: "GitHub 로그인",
        bgColor: "bg-purple-700 hover:bg-purple-800",
        textColor: "text-white",
        border: "border border-purple-900",
    },
    meta: {
        src: MetaIcon,
        label: "Facebook 로그인",
        bgColor: "bg-blue-600 hover:bg-blue-700",
        textColor: "text-white",
        border: "border border-blue-700",
    },
};

const SocialLoginButton: React.FC<Props> = ({ provider, onClick }) => {
    const { src, label, bgColor, textColor, border } = providerConfig[provider];

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-md transition ${bgColor} ${textColor} ${border} shadow-sm hover:shadow-md`}
        >
            <img src={src} alt={`${provider} icon`} className="h-6 w-6 object-contain" />
            <span className="text-sm font-semibold">{label}</span>
        </button>
    );
};

export default SocialLoginButton;

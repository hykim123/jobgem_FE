"use client";
import { getToken } from "@/app/util/token/token";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [jobseeker, setJobseeker] = useState({});
	const [myPageCnt, setMyPageCnt] = useState({});

	// login 값이 설정된 후에만 데이터 가져오기
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
		});
	}, []);

	useEffect(() => {
		if (login !== null) {
			getData(); // login 값이 설정된 후에만 데이터 호출
			getCnt();
		}
	}, [login]); // login 값이 변경될 때마다 호출

	// 데이터 가져오기
	function getData() {
		const API_URL = `/api/jobseeker/${login}`;
		axios.get(API_URL).then((res) => {
			setJobseeker(res.data);
		});
	}

	// 마이페이지 카운트 가져오기
	function getCnt() {
		const API_URL2 = `/api/jobseeker/mypage/count/${login}`;
		axios.get(API_URL2).then((res) => {
			setMyPageCnt(res.data);
		});
	}

	return (
		<div className='bg-gray-100 min-h-screen'>
			<main className='flex-1 rounded-lg bg-white p-8 shadow-lg'>
				{/* 프로필 섹션 */}
				<div className='flex items-center gap-5 mb-8'>
					<div className='flex items-center justify-center  bg-blue-100 rounded-full'>
						<img src={`/s3/${jobseeker.joImgUrl ? jobseeker.joImgUrl : "profile.png"}`} alt='프로필 사진' className='w-28 h-28 rounded-full object-cover border border-gray-300' />
					</div>
					<div>
						<h1 className='text-3xl font-extrabold text-gray-900 mb-2'>안녕하세요, {jobseeker.joName}입니다!</h1>
						<div className='text-lg text-gray-600 space-y-1'>
							<p>생년월일: {jobseeker.joBirth}</p>
							<p>주소: {jobseeker.joAddress}</p>
							<p>성별: {jobseeker.joGender}</p>
							<p>학력: {jobseeker.joEdu}</p>
						</div>
					</div>
				</div>

				{/* 통계 섹션 */}
				<div className='grid grid-cols-5 gap-4 mb-8 text-center'>
					{[
						{ title: "지원완료", value: [myPageCnt.지원완료] },
						{ title: "이력서 열람", value: [myPageCnt.이력서열람] },
						{ title: "입사 제안", value: [myPageCnt.입사제안] },
						{ title: "스크랩 공고", value: [myPageCnt.스크랩공고] },
						{ title: "관심기업공고", value: [myPageCnt.관심기업공고] },
					].map((stat, index) => (
						<div key={index} className='bg-blue-50 p-4 rounded-lg shadow-sm'>
							<div className='text-gray-600 font-medium'>{stat.title}</div>
							<div className='text-3xl font-bold text-blue-700'>{stat.value}</div>
						</div>
					))}
				</div>

				{/* 보유 스킬 섹션 */}
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-gray-900 mb-4'>보유 스킬</h2>
					<div className='flex flex-wrap gap-2'>
						{/* jobseeker.skills가 배열인지 확인 후 렌더링 */}
						{jobseeker.skills && jobseeker.skills.length > 0 ? (
							jobseeker.skills.map((skill, index) => (
								<span key={index} className='px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm'>
									{skill.skName}
								</span>
							))
						) : (
							<p className='text-gray-500'>보유 스킬이 없습니다.</p>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

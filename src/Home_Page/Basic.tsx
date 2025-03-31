import React, { useState } from 'react';

export const BasicQuestions: React.FC = () => {
  // 保存每道题的选中选项（1、2、3），初始均为 null 表示未选择
  const [selectedOptions, setSelectedOptions] = useState<Array<number | null>>(new Array(7).fill(null));

  // 当选择某个选项时，更新对应题目的选中值
  const handleOptionSelect = (questionIndex: number, option: number) => {
    const newSelections = [...selectedOptions];
    newSelections[questionIndex] = option;
    setSelectedOptions(newSelections);
  };

  // 计算已回答题目数量，更新进度条（总题数 7）
  const answeredCount = selectedOptions.filter((option) => option !== null).length;
  const progressPercentage = (answeredCount / selectedOptions.length) * 100;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>

      {/* 标题 */}
      <h1 style={{ textAlign: 'center' }}>Basic Questions</h1>

      {/* 7 道题，每题 3 个选项 */}
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index} style={{ marginBottom: '1.5rem' }}>
          <p>Question {index + 1}:</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(index, option)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: selectedOptions[index] === option ? '#4CAF50' : '',
                  color: selectedOptions[index] === option ? 'white' : '',
                }}
              >
                Option {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 进度条示例 */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#ccc',
            height: '20px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`, // 根据已回答题目数自动计算进度
              backgroundColor: 'green',
              height: '100%',
            }}
          ></div>
        </div>
      </div>

      {/* “Get Answers” 按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>Get Answers</button>
      </div>
    </div>
  );
};

export default BasicQuestions;

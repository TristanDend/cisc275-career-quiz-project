import React from 'react';

export const BasicQuestions: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      {/* 顶部导航 */}
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button>Home</button>
        <button>Quizzes</button>
        <button>Information</button>
      </nav>

      {/* 标题 */}
      <h1 style={{ textAlign: 'center' }}>Basic Questions</h1>

      {/* 7 道题，每题 3 个选项 */}
      {[1, 2, 3, 4, 5, 6, 7].map((questionNumber) => (
        <div key={questionNumber} style={{ marginBottom: '1.5rem' }}>
          <p>Question {questionNumber}:</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button>Option 1</button>
            <button>Option 2</button>
            <button>Option 3</button>
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
              width: '40%', // 这里可以根据需要修改进度百分比
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

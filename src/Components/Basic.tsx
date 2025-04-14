import React, { useState } from 'react';
import questions from './question.json'; // load question

// 定义数据接口（可选）
interface Option {
  optionId: string;
  optionText: string;
}

interface Question {
  questionId: string;
  questionText: string;
  allowMultiple: boolean;
  options: Option[];
}

// interface to hold the functions for navigation
interface BasicPageProps {
  setOnBasic: (onBasic: boolean) => void
  setOnResults: (onResults: boolean) => void
}

export const BasicQuestions: React.FC<BasicPageProps> = ({setOnBasic, setOnResults}) => {
  // questions 数据来自 question.json 文件，类型为 Question[]
  // 为每个问题初始化一个空数组，用于保存选中选项的索引（即使是单选，也统一使用数组）
  const [selectedOptions, setSelectedOptions] = useState<number[][]>(
    (questions as Question[]).map(() => [])
  );

    // turns the quiz off and turns results page on
    function toResultsPage() {
      setOnBasic(false);
      setOnResults(true);
    }

  // 当某个选项被点击时，更新对应问题的选中值
  const handleOptionSelect = (questionIndex: number, optionIndex: number): void => {
    const currentSelections = selectedOptions[questionIndex];
    const question = (questions as Question[])[questionIndex];

    let newSelectionsForQuestion: number[];

    if (question.allowMultiple) {
      // 允许多选则切换选中状态（选中则取消、未选中则添加）
      if (currentSelections.includes(optionIndex)) {
        newSelectionsForQuestion = currentSelections.filter((val) => val !== optionIndex);
      } else {
        newSelectionsForQuestion = [...currentSelections, optionIndex];
      }
    } else {
      // 单选则直接替换为当前选项
      newSelectionsForQuestion = [optionIndex];
    }

    const newSelections = [...selectedOptions];
    newSelections[questionIndex] = newSelectionsForQuestion;
    setSelectedOptions(newSelections);
  };

  // 清空所有题目的选择
  const clearSelections = (): void => {
    setSelectedOptions((questions as Question[]).map(() => []));
  };

  // 计算已回答的问题数量：只要该问题选项数组非空，则认为已经回答
  const answeredCount: number = selectedOptions.filter((selection) => selection.length > 0).length;
  const progressPercentage: number = (answeredCount / (questions as Question[]).length) * 100;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      {/* 标题 */}
      <h1 style={{ textAlign: 'center' }}>Basic Questions</h1>

      {/* 根据 JSON 模板动态渲染问题 */}
      {(questions as Question[]).map((question, qIndex) => (
        <div key={question.questionId} style={{ marginBottom: '1.5rem' }}>
          <p>{question.questionText}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {question.options.map((option, oIndex) => {
              const isSelected = selectedOptions[qIndex].includes(oIndex);
              return (
                <button
                  key={option.optionId}
                  onClick={() => { 
                    handleOptionSelect(qIndex, oIndex); 
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#4CAF50' : '',
                    color: isSelected ? 'white' : ''
                  }}
                >
                  {option.optionText}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* 进度条 */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#ccc',
            height: '20px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: 'green',
              height: '100%'
            }}
          ></div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button disabled={progressPercentage !== 100} style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginRight: '1rem' }} onClick={toResultsPage}>
          Get Answers
        </button>
        <button
          disabled={!progressPercentage}
          onClick={() => { 
            clearSelections(); 
          }}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BasicQuestions;

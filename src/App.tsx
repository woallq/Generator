import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface JsonData {
	title: string;
	titlePhotoUrl: string;
	coordinates: string;
	region: string;
	tabs: Array<{
		index: number;
		title: string;
		htmlContent: string;
	}>;
	tags: string[];
}

const App = () => {
	const [text, setText] = useState<{ [key: number]: string }>({
		0: '',
		1: '',
		2: '',
	});
	const [generatedText, setGeneratedText] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [coordinates, setCoordinates] = useState<string>('');
	const [region, setRegion] = useState<string>('');
	const [tags, setTags] = useState<string>('');
	const [activeTab, setActiveTab] = useState<number>(0);

	const handleChange = (value: string) => {
		setText(prevText => ({
			...prevText,
			[activeTab]: value,
		}));
	};

	const formatText = (tabIndex: number): string => {
		const titles = ['Описание', 'Немного фактов', 'Полезные советы'];
		const formattedText = text[tabIndex]
			.replace(/<strong>/g, "<span class='bold-text'>")
			.replace(/<\/strong>/g, '</span>')
			.replace(/<li>/g, "<p><span class='bold-text'>&#8226; </span>")
			.replace(/<\/li>/g, '</p>')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<br>/g, '')
			.replace(/&nbsp;/g, '');

		return `<div class='content-block'><div class='title'>${titles[tabIndex]}</div>${formattedText}</div>`;
	};

	const generateJson = () => {
		const jsonData: JsonData = {
			title: title,
			titlePhotoUrl: '',
			coordinates: coordinates,
			region: region,
			tabs: [
				{
					index: 0,
					title: 'Описание',
					htmlContent: formatText(0),
				},
				{
					index: 1,
					title: 'Немного фактов',
					htmlContent: formatText(1),
				},
				{
					index: 2,
					title: 'Полезные советы',
					htmlContent: formatText(2),
				},
			],
			tags: tags
				.split(' ')
				.map(tag => tag.trim().replace(/^#/, ''))
				.filter(tag => tag !== ''),
		};

		setGeneratedText(JSON.stringify(jsonData, null, 2));
	};

	const modules = {
		toolbar: [['bold'], ['link'], ['image']],
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Генератор</h1>
			<div>
				<p>Заголовок локации</p>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<p>Координаты локации</p>
				<input
					type='text'
					value={coordinates}
					onChange={e => setCoordinates(e.target.value)}
				/>
			</div>
			<div>
				<p>Регион локации</p>
				<input
					type='text'
					value={region}
					onChange={e => setRegion(e.target.value)}
				/>
			</div>
			<div>
				<p>Теги</p>
				<input
					type='text'
					value={tags}
					onChange={e => setTags(e.target.value)}
				/>
			</div>
			<div>
				<div>
					<button onClick={() => setActiveTab(0)}>Описание</button>
					<button onClick={() => setActiveTab(1)}>Немного фактов</button>
					<button onClick={() => setActiveTab(2)}>Полезные советы</button>
				</div>
				<ReactQuill
					value={text[activeTab]}
					onChange={handleChange}
					modules={modules}
				/>
			</div>
			<button onClick={generateJson}>Сгенерировать</button>
			<h1>JSONчик</h1>
			<div
				style={{
					border: '1px solid #ccc',
					padding: '10px',
					maxHeight: '300px',
					overflowY: 'auto',
					whiteSpace: 'pre-wrap',
				}}
			>
				<code>{generatedText}</code>
			</div>
		</div>
	);
};

export default App;

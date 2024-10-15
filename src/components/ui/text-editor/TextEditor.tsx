'use client'

import cn from 'clsx'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { ITextEditor } from './text-editor.interface'
import styles from './TextEditor.module.scss'
const TextEditor: FC<ITextEditor> = ({
	onChange,
	placeholder,
	error,
	value
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] = useState(false)

	useEffect(() => {
		if (!isUpdated) {
			const defaultValues = value ? value : ''
			const blocksFromHtnl = htmlToDraft(defaultValues)
			const contentState = ContentState.createFromBlockArray(
				blocksFromHtnl.contentBlocks,
				blocksFromHtnl.entityMap
			)

			const newEditorState = EditorState.createWithContent(contentState)
			setEditorState(newEditorState)
		}
	}, [value, isUpdated])

	const onEditorStateChange = (editor: EditorState) => {
		setIsUpdated(true)
		setEditorState(editor)

		return onChange(draftToHtml(convertToRaw(editor.getCurrentContent())))
	}

	return (
		<div className={cn(styles.common, styles.editorWrapper, 'animate-opacity')}>
			<span className="text-white">{placeholder}</span>
			<div className={styles.wrapper}>
				<Editor
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
					editorClassName={styles.editor}
					toolbarClassName={styles.toolbar}
					spellCheck
					toolbar={{
						options: ['inline', 'list'],
						inline: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ['bold', 'italic', 'underline', 'strikethrough']
						},
						list: {
							inDropdown: false,
							options: ['unordered', 'ordered']
						}
					}}
				/>
			</div>

			{error && <div className=''>{error.message}</div>}
		</div>
	)
}

export default TextEditor

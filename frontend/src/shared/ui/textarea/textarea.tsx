import classNames from 'classnames'
import React, { useState } from 'react'
import { Textarea as DaisyTextarea, TextareaProps } from 'react-daisyui'

interface TProps extends TextareaProps {
  addClassNames?: string
  textareaClassNames?: string
  label?: string
  error?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  maxLength?: number
}

export const Textarea = ({
  textareaClassNames,
  addClassNames,
  label,
  error,
  required,
  maxLength,
  ...props
}: TProps): JSX.Element => {
  const [text, setText] = useState('')

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <div className={addClassNames}>
      <div className='flex items-center justify-between'>
        {label && (
          <div className='label'>
            <span className='label-text font-semibold'>
              {label}
              {required && <span className='text-red-500'>*</span>}
            </span>
          </div>
        )}
        {maxLength && (
          <div className='label'>
            <span className='label-text-alt'>
              {`${text.length} / ${maxLength} символов`}
            </span>
          </div>
        )}
      </div>
      <DaisyTextarea
        {...props}
        maxLength={maxLength}
        value={text}
        onChange={handleTextChange}
        className={classNames(
          textareaClassNames,
          { 'input-error': error },
          'leading-5',
        )}
      />
      {error && (
        <div className='label'>
          <span className='label-text text-red-500'>{error}</span>
        </div>
      )}
    </div>
  )
}

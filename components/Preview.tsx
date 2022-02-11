import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { imagestate } from '../atoms/Imageatom'

function Preview({ file }: any) {
    const [preview, setpreview] = useState(null)
    const reader: any = new FileReader()
    const [value, setvalue] = useRecoilState(imagestate)
    reader.readAsDataURL(file)
    reader.onload = () => {
        setpreview(reader.result)
        setvalue(reader.result)
        console.log('value updated for recoil')
    }
    return (
        <div>
            {preview ? <img src={preview} alt='preview' /> : 'loading'}

        </div>
    )
}

export default Preview
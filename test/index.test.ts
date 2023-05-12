import { createGenerator } from '@unocss/core'
import { presetReactNative } from '../packages/preset-react-native/src'

describe('preset-react-native', () => {
    test('basic', async () => {
        const uno = createGenerator({
            presets: [
                presetReactNative()
            ]
        })
        
        const { css: css1 } = await uno.generate('backface-none bg-red-100', { minify: false, preflights: false })

        expect(css1).toContain('.backface-none{backfaceVisibility:none;}')

        const { css: css2 } = await uno.generate('backface-visible', { minify: false, preflights: false })

        expect(css2).toContain('.backface-visible{backfaceVisibility:visible;}')

        const { css: css3 } = await uno.generate('bg-red-100')

        expect(css3).toContain('.bg-red-100{backgroundColor:rgba(254,226,226,1);}')

        const { css: css4 } = await uno.generate('op10 op-30 opacity-100 pointer-events-none c-red color-red-50 text-red-300 font-mono')
        
        expect(css4)
    })

})
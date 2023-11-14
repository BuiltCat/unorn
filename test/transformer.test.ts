import { describe, it } from "vitest";
import { createGenerator } from "@unocss-native/core";
import { UN } from "@unocss-native/transformer";
import fs from 'fs';
import { resolve } from 'node:path';
import { Theme } from "@unocss-native/preset-react-native";

describe("transformer", () => {
    it("transformer", async () => {
        const path = resolve(__dirname, './assert/app.tsx')
        const src = fs.readFileSync(path, 'utf8');
        const un = new UN<Theme>({
            rules: [
                ["m-1", { margin: "0.25rem" }],
                [/^p-(\d)$/, ([, v]) => ({ padding: `${v}rem` })],
                [/^backface-([-\w]+)$/, ([, v]) => ({ backfaceVisibility: v })],
            ],
        })
    });
});
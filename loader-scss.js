import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
    const nextResult = await next(specifier, context);

    if (specifier.endsWith('.scss')) {
        return {
            format: 'scss',
            shortCircuit: true,
            url: nextResult.url
        }
    }

    if (specifier.endsWith('.hbs?raw')) {
        return {
            format: 'hbs',
            shortCircuit: true,
            url: nextResult.url
        }
    }

    return nextResult;
}

export async function load(url, context, next) {
    if (context.format === 'scss') {
        return {
            format: 'module',
            shortCircuit: true,
            source: ''
        }
    }

    if (context.format === 'hbs') {
        const rawSource = await fs.readFile(fileURLToPath(url), 'utf8')
        return {
            format: 'module',
            shortCircuit: true,
            source: `const template = ${JSON.stringify(
                rawSource
            )};\nexport default template;`
        }
    }

    return next(url, context);
}

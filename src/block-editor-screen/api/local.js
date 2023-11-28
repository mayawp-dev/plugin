/**
 * WordPress dependencies.
 */
const { apiFetch } = window.wp;

/**
 * Internal dependencies.
 */
const { apiRoute } = window.mayawpAppState;

export async function fetchTitles( options = {}, forceGenerate = false ){
    let result = {}

    try {
        const data = {
            'data': options,
            'action': 'content',
            'segment': 'core',
            'method': 'generate_titles_v1',
            forceGenerate,
        };

        result = await apiFetch({
            path: `/${apiRoute}/local/get_titles`,
            method: 'POST',
            data,
        } ).then(
            response => response
        );
    } catch (error) {
        result = {
            success: false,
        }
    }

    return result;
}

export async function fetchImage( options = {}, forceGenerate = false ){
    let result = {}

    try {
        const data = {
            'data': options,
            'action': 'image',
            'segment': 'core',
            'method': 'generate_image_v1',
            forceGenerate,
        };

        result = await apiFetch({
            path: `/${apiRoute}/local/get_image`,
            method: 'POST',
            data,
        } ).then(
            response => response
        );
    } catch (error) {
        result = {
            success: false,
        }
    }

    return result;
}
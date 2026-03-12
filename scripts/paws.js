const PAW_CONFIG = {
    src: './icon/paw.svg',
    count: 20,
    minSize: 45,
    maxSize: 90,
    opacityMin: 0.06,
    opacityMax: 0.08,
    parallaxStrength: 40.0,
    minDistBetween: 60 // Minimum pixels between paw centers
};

// --- Placement Helpers (Restored from your original code) ---
function isTooClose(x, y, size, placedPaws, minDist) {
    for (let other of placedPaws) {
        const dx = x - other.x;
        const dy = y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Check if centers are too close (accounting for their sizes)
        const combinedHalfSize = (size + other.size) / 2;
        if (distance < combinedHalfSize + minDist) {
            return true;
        }
    }
    return false;
}

async function initPaws() {
    const section = document.querySelector('.hero-section');
    const canvas = document.getElementById('paws-canvas');
    if (!section || !canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) return;

    // --- Shaders ---
    const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        uniform vec2 u_resolution;
        uniform vec2 u_offset;
        uniform float u_size;
        uniform float u_rotation;
        uniform vec2 u_mouse;
        uniform float u_depth;
        varying vec2 v_texCoord;

        void main() {
            vec2 mouseOffset = (u_mouse / u_resolution - 0.5) * ${PAW_CONFIG.parallaxStrength.toFixed(1)} * u_depth;
            float s = sin(u_rotation);
            float c = cos(u_rotation);
            mat2 rot = mat2(c, s, -s, c);
            vec2 pos = (a_position * u_size) * rot + u_offset + mouseOffset;
            vec2 clipSpace = (pos / u_resolution) * 2.0 - 1.0;
            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
            v_texCoord = a_texCoord;
        }
    `;

    const fsSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;
        uniform float u_opacity;
        void main() {
            vec4 color = texture2D(u_texture, v_texCoord);
            gl_FragColor = vec4(color.rgb, color.a * u_opacity);
        }
    `;

    function createShader(gl, type, source) {
        const s = gl.createShader(type);
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Buffers setup
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5,-0.5, 0.5,-0.5, -0.5,0.5, -0.5,0.5, 0.5,-0.5, 0.5,0.5]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 1,0, 0,1, 0,1, 1,0, 1,1]), gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // --- Generate Non-Overlapping Paws ---
    const paws = [];
    const rect = section.getBoundingClientRect();
    let attempts = 0;
    const maxAttempts = 500;

    while (paws.length < PAW_CONFIG.count && attempts < maxAttempts) {
        const size = Math.random() * (PAW_CONFIG.maxSize - PAW_CONFIG.minSize) + PAW_CONFIG.minSize;
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        if (!isTooClose(x, y, size, paws, PAW_CONFIG.minDistBetween)) {
            paws.push({
                x: x,
                y: y,
                size: size,
                rotation: Math.random() * Math.PI * 2,
                depth: Math.random() * 0.8 + 0.2,
                opacity: Math.random() * (PAW_CONFIG.opacityMax - PAW_CONFIG.opacityMin) + PAW_CONFIG.opacityMin
            });
        }
        attempts++;
    }

    // Texture loading
    const texture = gl.createTexture();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = PAW_CONFIG.src;
    let textureReady = false;
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        textureReady = true;
    };

    const uniforms = {
        res: gl.getUniformLocation(program, "u_resolution"),
        off: gl.getUniformLocation(program, "u_offset"),
        size: gl.getUniformLocation(program, "u_size"),
        rot: gl.getUniformLocation(program, "u_rotation"),
        mouse: gl.getUniformLocation(program, "u_mouse"),
        depth: gl.getUniformLocation(program, "u_depth"),
        opac: gl.getUniformLocation(program, "u_opacity")
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    window.addEventListener('mousemove', e => { 
        mouseX = e.clientX; 
        mouseY = e.clientY; 
    });

    function render() {
        if (canvas.width !== section.offsetWidth || canvas.height !== section.offsetHeight) {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!textureReady) return requestAnimationFrame(render);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform2f(uniforms.res, canvas.width, canvas.height);
        gl.uniform2f(uniforms.mouse, mouseX, mouseY);

        paws.forEach(paw => {
            gl.uniform2f(uniforms.off, paw.x, paw.y);
            gl.uniform1f(uniforms.size, paw.size);
            gl.uniform1f(uniforms.rot, paw.rotation);
            gl.uniform1f(uniforms.depth, paw.depth);
            gl.uniform1f(uniforms.opac, paw.opacity);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        });

        requestAnimationFrame(render);
    }
    render();
}

window.addEventListener('DOMContentLoaded', initPaws);
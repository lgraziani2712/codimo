/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
declare type PixiRendererOptionsParameterType = {|
  view?: HTMLCanvasElement,
  transparent?: boolean,
  autoResize?: boolean,
  antialias?: boolean,
  resolution?: number,
  clearBeforeRender?: boolean,
  backgroundColor?: number,
  roundPixels?: boolean,
  forceFXAA?: boolean,
  legacy?: boolean,
  preserveDrawingBuffer?: boolean,
|};
declare type PixiResourceType = {|
  name: string,
  url: string,
  crossOrigin?: boolean,
  loadType?: number,
  xhrType?: string,
  metadata?: {|
    loadElement?: HTMLImageElement | HTMLAudioElement | HTMLVideoElement,
    skipSource?: boolean,
  |},
  onComplete?: Function,
|};
declare type PixiTextStyleType = {|
  align?: string,
  breakWords?: boolean,
  dropShadow?: boolean,
  dropShadowAlpha?: number,
  dropShadowAngle?: number,
  dropShadowBlur?: number,
  dropShadowColor?: string,
  dropShadowDistance?: number,
  fill?: string | Array<string | number> | CanvasGradient | CanvasPattern,
  /**
   * @see TEXT_GRADIENT
   */
  fillGradientType?: number,
  fillGradientStops?: Array<number>,
  fontFamily?: string | Array<string>,
  fontSize?: number | string,
  fontStyle?: string,
  fontVariant?: string,
  fontWeight?: string,
  letterSpacing?: number,
  lineHeight?: number,
  lineJoin?: string,
  miterLimit?: number,
  padding?: number,
  stroke?: string | number,
  strokeThickness?: number,
  trim?: boolean,
  textBaseline?: string,
  wordWrap?: boolean,
  wordWrapWidth?: number,
|};

declare function OnCompleteSignal(loader: ResourceLoader): void;
declare function OnErrorSignal(loader: ResourceLoader, resource: Resource): void;
// TODO add props and methods
declare class Resource {
  static LOAD_TYPE: number;
  static STATUS_FLAGS: number;
  static TYPE: number;
  static XHR_RESPONSE_TYPE: string;
  /**
   * @readonly
   */
  isComplete: boolean;
  /**
   * @readonly
   */
  isDataUrl: boolean;
  /**
   * @readonly
   */
  isLoading: boolean;
}

// TODO all props, methods
// https://github.com/englercj/resource-loader
declare class ResourceLoader {
  defaultQueryString: string;
  onComplete: {| add(cb: OnCompleteSignal): void |};
  onError: {| add(): void |};

  constructor(baseUrl?: string, concurrency?: number): ResourceLoader;

  add(name: string, url: string, options: Object, cb: Function): ResourceLoader;
  add(url: string, options: Object, cb?: Function): ResourceLoader;
  add(url: string, cb?: Function): ResourceLoader;
  add(url: string): ResourceLoader;
  add(resource: PixiResourceType): ResourceLoader;
  add(url: Array<string | PixiResourceType>): ResourceLoader;

  load(cb?: Function): ResourceLoader;
  reset(): ResourceLoader;
}

// TODO all props and methods
// https://nodejs.org/api/events.html#events_class_eventemitter
declare class EventEmitter {
  constructor(): EventEmitter;
  on(eventName: string, listener: Function): void;
}

/**
 * @mixin
 * FIXME is definition this OK?
 */
declare class InteractiveTarget {
  /**
   * If enabled, the mouse cursor use the pointer behavior when hovered over the displayObject if it is interactive
   * Setting this changes the 'cursor' property to `'pointer'`.
   *
   * @member {boolean}
   * @memberof PIXI.interaction.interactiveTarget#
   */
  buttonMode: boolean;
  /**
   * This defines what cursor mode is used when the mouse cursor
   * is hovered over the displayObject.
   *
   * @see https://developer.mozilla.org/en/docs/Web/CSS/cursor
   *
   * @member {string}
   * @memberof PIXI.interaction.interactiveTarget#
   */
  cursor: string;
  /**
   * Determines if the displayObject be clicked/touched
   *
   * @member {boolean}
   * @memberof PIXI.interaction.interactiveTarget#
   */
  interactive: boolean;
  /**
   * Determines if the children to the displayObject can be clicked/touched
   * Setting this to false allows pixi to bypass a recursive hitTest function
   *
   * @member {boolean}
   * @memberof PIXI.interaction.interactiveTarget#
   */
  interactiveChildren: boolean;
}
declare class Ticker {
  autoStart: boolean;
  deltaTime: number;
  elapsedMS: number;
  /**
   * @readonly
   */
  FPS: number;
  lastTime: number;
  minFPS: number;
  speed: number;
  started: boolean;

  constructor(): Ticker;
  add(fn: Function, context?: Function): Ticker;
  addOnce(fn: Function, context?: Function): Ticker;
  remove(fn?: Function, context?: Function): Ticker;
  start(): void;
  stop(): void;
  update(currentTime?: number): void;
}

declare module 'pixi.js' {
  // TODO all props, methods
  // FIXME This is not OK. It must be a private class and public only under `extras` namespace
  declare class AnimatedSprite extends Sprite {
    animationSpeed: number;

    // TODO FrameObject
    constructor(textures: Array<Texture | Object>, autoUpdate?: boolean): AnimatedSprite;
    gotoAndPlay(frameNumber: number): void;
    gotoAndStop(frameNumber: number): void;
    play(): void;
    stop(): void;
  }
  declare class Application {
    renderer: WebGLRenderer | CanvasRenderer;
    /**
     * @readonly
     */
    screen: Rectangle;
    stage: Container;
    ticker: Ticker;
    /**
     * @readonly
     */
    view: HTMLCanvasElement;

    constructor(
      width?: number,
      height?: number,
      options?: PixiRendererOptionsParameterType,
      noWebGL?: boolean,
      useSharedTicker?: boolean,
    ): Application;
    destroy(removeView?: boolean): void;
    render(): void;
    start(): void;
    stop(): void;
  }
  /**
   * @event error   Fired when a not-immediately-available source fails to load.
   * @event loaded  Fired when a not-immediately-available source finishes loading.
   */
  declare class BaseRenderTexture extends BaseTexture {
    valid: boolean;

    constructor(
      width?: number,
      height?: number,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      resolution?: number,
    ): BaseRenderTexture;
  }
  // TODO add internal API as _loadSvgSource?
  declare class BaseTexture extends EventEmitter {
    static from(
      source: string | HTMLImageElement | HTMLCanvasElement,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      sourceScale?: number,
    ): BaseTexture;
    static fromCanvas(
      canvas: HTMLCanvasElement,
      /**
       * @see SCALE_MODES
       */
      scaleMode: number,
    ): BaseTexture;
    static fromImage(
      imageUrl: string,
      crossorigin: boolean,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      sourceScale?: number,
    ): BaseTexture;
    /**
     * @readonly
     */
    hasLoaded: boolean;
    /**
     * @readonly
     */
    height: number;
    /**
     * @readonly
     */
    imageType: string;
    imageUrl: string;
    /**
     * @see MIPMAP_TEXTURES
     */
    mipmap: boolean;
    // TODO v4.4.3 not in use origSource: Image;
    premultipliedAlpha: boolean;
    /**
     * @readonly
     */
    realHeight: number;
    /**
     * @readonly
     */
    realWidth: number;
    resolution: number;
    /**
     * @see SCALE_MODES
     */
    scaleMode: number;
    /**
     * @readonly
     */
    source: HTMLImageElement | HTMLCanvasElement;
    /**
     * @readonly
     */
    sourceScale: number;
    /**
     * @readonly
     */
    width: number;
    /**
     * @see WRAP_MODES
     */
    wrapMode: number;

    constructor(
      source?: HTMLImageElement | HTMLCanvasElement,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      resolution?: number,
    ): BaseTexture;
    destroy(): void;
    dispose(): void;
    update(): void;
    updateSourceImage(newSrc: string): void;
  }
  // TODO all props and methods
  declare class CanvasRenderer extends SystemRenderer {
    constructor(
      screenWidth?: number,
      screenHeight?: number,
      options?: PixiRendererOptionsParameterType,
    ): CanvasRenderer;
    clear(clearColor?: number): void;
    render(
      displayObject: DisplayObject,
      renderTexture?: RenderTexture,
      clear?: boolean,
      // TODO Transform
      transform?: Object,
      skipUpdateTransform?: boolean,
    ): void;
  }
  declare class Circle {
    radius: number;
    /**
     * @readonly
     * @see SHAPES
     */
    type: number;
    x: number;
    y: number;

    constructor(x?: number, y?: number, radius?: number): Circle;
    clone(): Circle;
    contains(x: number, y: number): boolean;
    getBounds(): Rectangle;
  }
  // TODO all props and methods
  declare class Container extends DisplayObject {
    /**
     * @readonly
     */
    children: Array<DisplayObject>;
    height: number;
    // TODO Point
    position: Object;
    width: number;

    constructor(): Container;
    addChild(child: DisplayObject): DisplayObject;
    addChildAt(child: DisplayObject, index: number): DisplayObject;
  }
  /**
   * Abstract class
   * TODO all props and methods
   */
  declare class DisplayObject extends EventEmitter mixins InteractiveTarget {
    alpha: number;
    cacheAsBitmap: boolean;
    filterArea: Rectangle;
    /**
     * WebGL only feature
     */
    filters: Array<Filter>;
    mask: Graphics | Sprite;
    /**
     * @readonly
     */
    parent: Container;
    pivot: Point | ObservablePoint;
    position: Point | ObservablePoint;
    renderable: boolean;
    rotation: number;
    scale: Point | ObservablePoint;
    skew: ObservablePoint;
    x: number;
    y: number;
  }
  declare class Ellipse {
    height: number;
    /**
     * @readonly
     * @see SHAPES
     */
    type: number;
    width: number;
    x: number;
    y: number;

    constructor(x?: number, y?: number, width?: number, height?: number): Ellipse;
    clone(): Ellipse;
    contains(x: number, y: number): boolean;
    getBounds(): Rectangle;
  }
  declare class Filter extends Shader {
    static defaultFragmentSrc: string;
    static defaultVertexSrc: string;

    enabled: boolean;
    fragmentSrc: string;
    padding: number;
    resolution: number;
    uniforms: Object;
    vertexSrc: string;

    constructor(vertexSrc?: string, fragmentSrc?: string, uniforms?: Object): Filter;
    apply(
      filterManager: FilterManager,
      input: RenderTarget,
      output: RenderTarget,
      clear: boolean,
      currentState?: Object,
    ): void;
  }
  // TODO all props and methods
  declare class FilterManager {

  }
  // TODO all props
  declare class Graphics extends Container {
    constructor(nativeLines?: boolean): Graphics;
    addHole(): Graphics;
    arc(
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      anticlockwise?: boolean,
    ): Graphics;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
    beginFill(color?: number, alpha?: number): Graphics;
    bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
    clear(): Graphics;
    clone(): Graphics;
    closePath(): Graphics;
    containsPoint(point: Point): boolean;
    destroy(options?: boolean | {|
      children?: boolean,
      texture?: boolean,
      baseTexture?: boolean,
    |}): void;
    drawCircle(x: number, y: number, radius: number): Graphics;
    drawEllipse(x: number, y: number, width: number, height: number): Graphics;
    drawPolygon(path: Array<number | Point>): Graphics;
    drawRect(x: number, y: number, width: number, height: number): Graphics;
    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
    drawShape(shape: Circle | Ellipse | Polygon | Rectangle | RoundedRectangle): Graphics;
    endFill(): Graphics;
    generateCanvasTexture(scaleMode: number, resolution: number): Texture;
    isFastRect(): boolean;
    lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
    lineTo(x: number, y: number): Graphics;
    moveTo(x: number, y: number): Graphics;
    quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
    updateLocalBounds(): void;
  }
  // TODO add props
  // TODO add internal API?
  declare class Mesh extends Container {
    static DRAW_MODES: {|
      TRIANGLE_MESH: number,
      TRIANGLES: number,
    |};

    /**
     * @see DRAW_MODES
     */
    drawMode: number;
    indexDirty: number;
    uvs: Float32Array;
    vertices: Float32Array;

    constructor(
      texture: Texture,
      vertices?: Float32Array,
      uvs?: Float32Array,
      indices?: Uint16Array,
      /**
       * @see DRAW_MODES
       */
      drawMode?: number,
    ): Mesh;
    containsPoint(point: Point): boolean;
  }
  declare class ObservablePoint {
    x: number;
    y: number;

    constructor(cb: Function, scope: Object, x?: number, y?: number): ObservablePoint;
    copy(point: Point | ObservablePoint): void;
    set(x?: number, y?: number): void;
  }
  declare class Point {
    x: number;
    y: number;

    constructor(x?: number, y?: number): Point;
    clone(): Point;
    copy(p: Point): void;
    equals(p: Point): boolean;
    set(x?: number, y?: number): void;
  }
  declare class Polygon {
    points: Array<number>;
    /**
     * @readonly
     * @see SHAPES
     */
    type: number;

    constructor(points: Array<Point | number>): Polygon;
    clone(): Polygon;
    close(): void;
    contains(x: number, y: number): boolean;
  }
  declare class Rectangle {
    static EMPTY: Rectangle;

    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    /**
     * @readonly
     * @see SHAPES
     */
    type: number;
    width: number;
    x: number;
    y: number;

    constructor(x?: number, y?: number, width?: number, height?: number): Rectangle;
    clone(): Rectangle;
    contains(x: number, y: number): boolean;
    copy(rectangle: Rectangle): Rectangle;
    enlarge(rectangle: Rectangle): void;
    fit(rectangle: Rectangle): void;
    pad(paddingX: number, paddingY: number): void;
  }
  // TODO all props and methods
  declare class RenderTarget {

  }
  declare class RenderTexture extends Texture {
    static create(
      width?: number,
      height?: number,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      resolution?: number,
    ): RenderTexture;

    constructor(baseRenderTexture: BaseRenderTexture, frame?: Rectangle): RenderTexture;
    resize(width: number, height: number, doNotResizeBaseTexture: boolean): void;
  }
  // TODO add props
  declare class Rope extends Mesh {
    constructor(texture: Texture, points: Array<Point>): Rope;
    refresh(): void;
  }
  declare class RoundedRectangle {
    height: number;
    radius: number;
    /**
     * @readonly
     * @see SHAPES
     */
    type: number;
    width: number;
    x: number;
    y: number;

    constructor(x?: number, y?: number, width?: number, height?: number, radius?: number): RoundedRectangle;
    clone(): RoundedRectangle;
    contains(x: number, y: number): boolean;
  }
  // TODO props, methods and extends
  declare class Shader {
    constructor(
      gl: WebGLRenderingContext,
      vertexSrc: string | Array<string>,
      fragmentSrc: string | Array<string>,
    ): Shader;
  }
  // TODO all props and methods
  declare class SystemRenderer extends EventEmitter {
    autoResize: boolean;
    backgroundColor: number;
    /**
     * @see BLEND_MODES
     * TODO check if this type is correct
     */
    blendModes: Object;
    /**
     * @readonly
     */
    height: number;
    clearBeforeRender: boolean;
    preserveDrawingBuffer: boolean;
    resolution: number;
    roundPixels: number;
    screen: Rectangle;
    transparent: boolean;
    /**
    * @see RENDERER_TYPE
    */
    type: number;
    view: HTMLCanvasElement;
    /**
     * @readonly
     */
    width: number;

    constructor(
      system: string,
      screenWidth?: number,
      screenHeight?: number,
      options?: PixiRendererOptionsParameterType,
    ): SystemRenderer;
    destroy(removeView?: boolean): void;
    generateTexture(
      displayObject: DisplayObject,
      /**
       * @see SCALE_MODES
       */
      scaleMode: number,
      resolution: number,
    ): Texture;
    resize(screenWidth: number, screenHeight: number): void;
  }
  // TODO all props and methods
  declare class Sprite extends Container {
    static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

    anchor: ObservablePoint;
    shader: Filter | Shader;
    tint: number;

    constructor(texture: string | Texture): Sprite;
  }
  // TODO Add internal API?
  declare class Text extends Sprite {
    static calculateFontProperties(fontStyle: string): Object;
    static getFontStyle(style: Object | TextStyle): Object;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;
    style: Object | TextStyle;
    text: string;

    constructor(text: string, style?: Object | TextStyle, canvas?: HTMLCanvasElement): Text;
    destroy(options?: boolean | {|
      children?: boolean,
      texture?: boolean,
      baseTexture?: boolean,
    |}): void;
    getLocalBounds(rect: Rectangle): Rectangle;
    renderWebGL(renderer: WebGLRenderer): void;
  }
  declare class TextStyle {
    constructor(style?: PixiTextStyleType): TextStyle;
    clone(): TextStyle;
    reset(): void;
  }
  /**
   * @event update
   */
  declare class Texture extends EventEmitter {
    static EMPTY: Texture;
    static WHITE: Texture;
    static addTextureToCache(texture: Texture, id: string): void;
    static from(
      source: number | string | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | BaseTexture,
    ): Texture;
    static fromCanvas(
      canvas: HTMLCanvasElement,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
    ): Texture;
    static fromFrame(frameId: string): Texture;
    static fromImage(
      imageUrl: string,
      crossorigin?: boolean,
      /**
       * @see SCALE_MODES
       */
      scaleMode?: number,
      sourceScale?: number,
    ): Texture;
    static fromLoader(source: HTMLImageElement | HTMLCanvasElement, imageUrl: string, name?: string): Texture;
    static fromVideo(
      video: HTMLVideoElement | string,
      /**
       * @see SCALE_MODES
       */
      scaleMode: number,
    ): Texture;
    static fromVideoUrl(
      videoUrl: string,
      /**
       * @see SCALE_MODES
       */
      scaleMode: number,
    ): Texture;
    static removeTextureFromCache(id: string): Texture;

    _frame: Rectangle;
    baseTexture: BaseTexture;
    frame: Rectangle;
    height: number;
    noFrame: boolean;
    orig: Rectangle;
    requiresUpdate: boolean;
    rotate: number;
    trim: Rectangle;
    valid: boolean;
    width: number;

    constructor(
      baseTexture: BaseTexture,
      frame?: Rectangle,
      orig?: Rectangle,
      trim?: Rectangle,
      rotate?: number,
    ): Texture;
    clone(): Texture;
    destroy(destroyBase: boolean): void;
    update(): void;
  }
  declare class TilingSprite extends Sprite {
    clampMargin: number;
    pluginName: string;
    tilePosition: ObservablePoint;
    tileScale: ObservablePoint;
    // TODO TransformStatic
    tileTransform: Object;
    uvRespectAnchor: boolean;
    // TODO extras.TextureTransform
    uvTransform: Object;

    constructor(texture: Texture, width?: number, height?: number): TilingSprite;
    from(
      source: number | string | BaseTexture | HTMLCanvasElement | HTMLVideoElement,
      width: number,
      height: number,
    ): TilingSprite;
    fromFrame(frameId: string, width: number, height: number): TilingSprite;
    fromImage(
      imageId: string,
      width: number,
      height: number,
      crossorigin?: boolean,
      /**
       * @see SCALE_MODES
       */
      scaleMode: number,
    ): TilingSprite;
  }
  // TODO all props and methods
  declare class WebGLRenderer extends SystemRenderer {
    constructor(
      screenWidth?: number,
      screenHeight?: number,
      options?: PixiRendererOptionsParameterType,
    ): WebGLRenderer;
    bindRenderTarget(renderTarget: RenderTarget): WebGLRenderer;
    // TODO Transform
    bindRenderTexture(renderTexture: RenderTexture, transform: Object): WebGLRenderer;
    bindShader(shader: Shader, autoProject?: boolean): WebGLRenderer;
    bindTexture(texture: Texture, location: number, forceLocation: boolean): WebGLRenderer;
    // TODO VertexArrayObject
    bindVao(vao: Object): WebGLRenderer;
    clear(clearColor?: number): void;
    clearRenderTexture(renderTexture: RenderTexture, clearColor?: number): WebGLRenderer;
    // TODO VertexArrayObject
    createVao(): Object;
    flush(): void;
    render(
      displayObject: DisplayObject,
      renderTexture: RenderTexture,
      clear?: boolean,
      // TODO Transform
      transform?: Object,
      skipUpdateTransform?: boolean,
    ): void;
    reset(): WebGLRenderer;
    /**
     * @see BLEND_MODES
     */
    setBlendMode(blendMode: number): void;
    // TODO ObjectRenderer
    setObjectRenderer(objectRenderer: Object): void;
    // TODO Matrix
    setTransform(matrix: Object): void;
    unbindTexture(texture: Texture): WebGLRenderer;
  }

  ///////////////////////////////////////////////////
  // PIXI members
  ///////////////////////////////////////////////////
  declare var BLEND_MODES: {|
    NORMAL: number,
    ADD: number,
    MULTIPLY: number,
    SCREEN: number,
    OVERLAY: number,
    DARKEN: number,
    LIGHTEN: number,
    COLOR_DODGE: number,
    COLOR_BURN: number,
    HARD_LIGHT: number,
    SOFT_LIGHT: number,
    DIFFERENCE: number,
    EXCLUSION: number,
    HUE: number,
    SATURATION: number,
    COLOR: number,
    LUMINOSITY: number,
  |};
  declare var CAN_UPLOAD_SAME_BUFFER: boolean;
  declare var DATA_URI: RegExp | string;
  declare var DRAW_MODES: {|
    POINTS: number,
    LINES: number,
    LINE_LOOP: number,
    LINE_STRIP: number,
    TRIANGLES: number,
    TRIANGLE_STRIP: number,
    TRIANGLE_FAN: number,
  |};
  declare var loader: ResourceLoader;
  declare var GC_MODE: {|
    AUTO: number,
    MANUAL: number,
  |};
  declare var PRECISION: {|
    LOW: string,
    MEDIUM: string,
    HIGH: string,
  |};
  declare var RENDERER_TYPE: {|
    UNKNOWN: number,
    WEBGL: number,
    CANVAS: number,
  |};
  declare var SCALE_MODES: {|
    LINEAR: number,
    NEAREST: number,
  |};
  declare var SHAPES : {|
    POLY: number,
    RECT: number,
    CIRC: number,
    ELIP: number,
    RREC: number,
  |};
  declare var SVG_SIZE: RegExp | string;
  declare var TEXT_GRADIENT: {|
    LINEAR_VERTICAL: number,
    LINEAR_HORIZONTAL: number,
  |};
  declare var TRANSFORM_MODE: {|
    STATIC: number,
    DYNAMIC: number,
  |};
  declare var VERSION: string;
  declare var WRAP_MODES: {|
    CLAMP: number,
    REPEAT: number,
    MIRRORED_REPEAT: number,
  |};
  ///////////////////////////////////////////////////
  // PIXI namespaces
  ///////////////////////////////////////////////////
  // They need to be at the end since declarations
  // must be before.
  declare var extras: {|
    AnimatedSprite: typeof AnimatedSprite,
    TilingSprite: typeof TilingSprite,
  |};
  declare var mesh: {|
    Mesh: typeof Mesh,
    Rope: typeof Rope,
  |};
  declare var loaders: {|
    Loader: typeof ResourceLoader,
  |};
  declare var settings: {|
    FILTER_RESOLUTION: number,
    GC_MAX_CHECK_COUNT: number,
    GC_MAX_IDLE: number,
    GC_MODE: number,
    MIPMAP_TEXTURES: boolean,
    PRECISION_FRAGMENT: number,
    PRECISION_VERTEX: string,
    RENDER_OPTIONS: PixiRendererOptionsParameterType,
    RESOLUTION: number,
    RETINA_PREFIX: RegExp,
    SCALE_MODE: number,
    SPRITE_BATCH_SIZE: number,
    SPRITE_MAX_TEXTURES: number,
    TARGET_FPMS: number,
    TRANSFORM_MODE: number,
    UPLOADS_PER_FRAME: number,
    WRAP_MODE: number,
  |};
  declare var ticker: {|
    Ticker: typeof Ticker,
  |};
}

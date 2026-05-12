import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LangService, Lang } from '../../services/lang.service';

const TRANSLATIONS = {
  es: {
    eyebrow: 'Elements / Display',
    description: 'Utilidades CSS para controlar el <code>display</code> y las propiedades de <code>flexbox</code> y <code>grid</code>. Todas las clases soportan el sistema responsive con los mismos breakpoints definidos en Settings.',
    summaryTitle: 'Display, flex y grid utilities',
    intro: 'Permite controlar la propiedad <code>display</code> (<code>block</code>, <code>flex</code>, <code>grid</code>, <code>none</code>…) y las utilidades relacionadas con <strong>flexbox</strong> y <strong>grid</strong>. Las clases siguen el patrón <code>.u-&#123;propiedad&#125;-&#123;valor&#125;</code> y admiten modificador de breakpoint <code>.u-&#123;propiedad&#125;-&#123;bp&#125;-&#123;valor&#125;</code>.',
    thSuffix: 'Sufijo', thDescription: 'Descripción', thClass: 'Clase', thCSS: 'CSS generado', thUsage: 'Uso típico',
    breakpointsTitle: 'Breakpoints disponibles:',
    displayValuesTitle: 'Valores de display:',
    justifyTitle: 'Alineación horizontal — justify-content:',
    alignTitle: 'Alineación vertical — align-items / align-self:',
    placeTitle: 'Alineación bidireccional — place-content:',
    directionTitle: 'Dirección — flex-direction:',
    wrapTitle: 'Salto de línea — flex-wrap:',
    bpSm: 'Tablet en adelante', bpMd: 'Escritorio pequeño', bpLg: 'Escritorio grande', bpXl: 'Pantalla extra grande', bpXxl: 'Pantalla ultra ancha',
    dsBlock: 'Elemento de bloque estándar', dsInline: 'Elemento inline dentro de texto',
    dsInlineBlock: 'Bloque con flujo inline (ancho y alto configurables)',
    dsFlex: 'Contenedor flexbox para alinear hijos', dsInlineFlex: 'Flexbox inline, útil en botones o chips',
    dsGrid: 'Contenedor CSS grid', dsNone: 'Oculta el elemento del flujo del documento', dsSmGrid: 'Grid sólo a partir de tablet',
    justifyStart: 'Alinea hijos al inicio del eje principal', justifyCenter: 'Centra hijos horizontalmente',
    justifyEnd: 'Empuja hijos al final del contenedor', justifyBetween: 'Distribuye hijos con espacio entre ellos',
    justifyAround: 'Espacio uniforme alrededor de cada hijo', justifyLgBetween: 'Space-between sólo en pantallas grandes',
    alignStart: 'Hijos alineados al inicio del eje transversal', alignCenter: 'Hijos centrados verticalmente',
    alignEnd: 'Hijos alineados al final del eje transversal', alignStretch: 'Hijos estiran para ocupar todo el alto disponible',
    alignSelfEnd: 'Un único hijo se alinea al final independientemente', alignSelfCenter: 'Un único hijo se centra en el eje transversal',
    placeCenter: 'Centra contenido en ambos ejes (grid/flex)', placeStartEnd: 'Inicio en eje principal, fin en eje transversal',
    placeBetweenCenter: 'Distribuido entre columnas, centrado por filas',
    dirRow: 'Hijos en fila horizontal (valor por defecto)', dirCol: 'Hijos apilados verticalmente',
    dirRowrev: 'Hijos en fila horizontal invertida', dirColrev: 'Hijos apilados en orden inverso',
    dirMdRowrev: 'Invierte la fila sólo en escritorio pequeño',
    wrapWrap: 'Hijos saltan de línea si no caben en el contenedor', wrapNowrap: 'Fuerza todos los hijos en una sola fila',
    wrapReverse: 'Wrap pero las filas se apilan en orden inverso', wrapXlWrap: 'Permite wrap sólo en pantallas ultra anchas',
    demoWrapWrap: '.u-wrap-wrap — los hijos saltan de línea', demoWrapNowrap: '.u-wrap-nowrap — todos en una sola fila',
    doTitle: '✔️ Forma correcta', dontTitle: '❌ Usos prohibidos',
    do1: 'Usar <code>.u-ds-flex</code> junto con <code>.u-align-center</code> y <code>.u-justify-between</code> para barras de navegación.',
    do2: 'Combinar <code>.u-dir-col</code> en móvil con <code>.u-dir-md-row</code> para layouts responsivos.',
    do3: 'Usar <code>.u-ds-none</code> con breakpoint para ocultar elementos en ciertos viewports: <code>.u-ds-sm-none</code>.',
    do4: 'Aplicar <code>.u-place-center</code> en contenedores grid para centrar en ambos ejes de forma concisa.',
    dont1: 'No combinar <code>.u-ds-flex</code> y <code>.u-ds-grid</code> en el mismo elemento.',
    dont2: 'No usar <code>.u-justify-*</code> o <code>.u-align-*</code> en elementos sin <code>display: flex</code> o <code>display: grid</code>.',
    dont3: 'No usar <code>.u-ds-none</code> para ocultar contenido accesible; usar atributos ARIA en su lugar.',
  },
  en: {
    eyebrow: 'Elements / Display',
    description: 'CSS utilities to control the <code>display</code> property and <code>flexbox</code> and <code>grid</code> behaviours. All classes support the responsive system with the same breakpoints defined in Settings.',
    summaryTitle: 'Display, flex and grid utilities',
    intro: 'Allows controlling the <code>display</code> property (<code>block</code>, <code>flex</code>, <code>grid</code>, <code>none</code>…) and the utilities related to <strong>flexbox</strong> and <strong>grid</strong>. Classes follow the pattern <code>.u-&#123;property&#125;-&#123;value&#125;</code> and support a breakpoint modifier <code>.u-&#123;property&#125;-&#123;bp&#125;-&#123;value&#125;</code>.',
    thSuffix: 'Suffix', thDescription: 'Description', thClass: 'Class', thCSS: 'Generated CSS', thUsage: 'Typical use',
    breakpointsTitle: 'Available breakpoints:',
    displayValuesTitle: 'Display values:',
    justifyTitle: 'Horizontal alignment — justify-content:',
    alignTitle: 'Vertical alignment — align-items / align-self:',
    placeTitle: 'Bidirectional alignment — place-content:',
    directionTitle: 'Direction — flex-direction:',
    wrapTitle: 'Line wrapping — flex-wrap:',
    bpSm: 'Tablet and above', bpMd: 'Small desktop', bpLg: 'Large desktop', bpXl: 'Extra large screen', bpXxl: 'Ultra wide screen',
    dsBlock: 'Standard block element', dsInline: 'Inline element within text',
    dsInlineBlock: 'Block with inline flow (configurable width and height)',
    dsFlex: 'Flexbox container for aligning children', dsInlineFlex: 'Inline flexbox, useful for buttons or chips',
    dsGrid: 'CSS grid container', dsNone: 'Hides the element from the document flow', dsSmGrid: 'Grid only from tablet breakpoint',
    justifyStart: 'Aligns children to the start of the main axis', justifyCenter: 'Centers children horizontally',
    justifyEnd: 'Pushes children to the end of the container', justifyBetween: 'Distributes children with space between them',
    justifyAround: 'Uniform space around each child', justifyLgBetween: 'Space-between only on large screens',
    alignStart: 'Children aligned to the start of the cross axis', alignCenter: 'Children centered vertically',
    alignEnd: 'Children aligned to the end of the cross axis', alignStretch: 'Children stretch to fill all available height',
    alignSelfEnd: 'A single child aligns to the end independently', alignSelfCenter: 'A single child centers itself on the cross axis',
    placeCenter: 'Centers content on both axes (grid/flex)', placeStartEnd: 'Start on main axis, end on cross axis',
    placeBetweenCenter: 'Distributed between columns, centered by rows',
    dirRow: 'Children in horizontal row (default value)', dirCol: 'Children stacked vertically',
    dirRowrev: 'Children in reversed horizontal row', dirColrev: 'Children stacked in reverse order',
    dirMdRowrev: 'Reverses the row only on small desktop',
    wrapWrap: "Children wrap to the next line if they don't fit", wrapNowrap: 'Forces all children into a single row',
    wrapReverse: 'Wrap but rows stack in reverse order', wrapXlWrap: 'Allows wrap only on ultra-wide screens',
    demoWrapWrap: '.u-wrap-wrap — children wrap to next line', demoWrapNowrap: '.u-wrap-nowrap — all in a single row',
    doTitle: '✔️ Correct usage', dontTitle: '❌ Prohibited usage',
    do1: 'Use <code>.u-ds-flex</code> combined with <code>.u-align-center</code> and <code>.u-justify-between</code> for navigation bars.',
    do2: 'Combine <code>.u-dir-col</code> on mobile with <code>.u-dir-md-row</code> for responsive layouts.',
    do3: 'Use <code>.u-ds-none</code> with a breakpoint to hide elements at certain viewports: <code>.u-ds-sm-none</code>.',
    do4: 'Apply <code>.u-place-center</code> on grid containers to center on both axes concisely.',
    dont1: 'Do not combine <code>.u-ds-flex</code> and <code>.u-ds-grid</code> on the same element.',
    dont2: 'Do not use <code>.u-justify-*</code> or <code>.u-align-*</code> on elements without <code>display: flex</code> or <code>display: grid</code>.',
    dont3: 'Do not use <code>.u-ds-none</code> to hide accessible content; use ARIA attributes instead.',
  }
};

@Component({
    selector: 'app-display-docs',
    templateUrl: './display-docs.component.html',
    styleUrls: ['./display-docs.component.scss']
})
export class DisplayDocsComponent implements OnInit, OnDestroy {
  public lang: Lang = 'es';
  private sub!: Subscription;

  constructor(
    private readonly langService: LangService,
    private readonly sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.sub = this.langService.lang$.subscribe(l => this.lang = l);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get t() {
    return TRANSLATIONS[this.lang];
  }

  safe(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}


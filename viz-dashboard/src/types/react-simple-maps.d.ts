declare module 'react-simple-maps' {
    import * as React from 'react';

    export interface ComposableMapProps {
        width?: number;
        height?: number;
        projection?: string | ((width: number, height: number, config: any) => any);
        projectionConfig?: any;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;

    export interface ZoomableGroupProps {
        center?: [number, number];
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        translateExtent?: [[number, number], [number, number]];
        onMoveStart?: (position: { coordinates: [number, number]; zoom: number }, event: any) => void;
        onMove?: (position: { coordinates: [number, number]; zoom: number }, event: any) => void;
        onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }, event: any) => void;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }

    export const ZoomableGroup: React.FC<ZoomableGroupProps>;

    export interface GeographiesProps {
        geography?: string | Record<string, any> | string[];
        children: (args: { geographies: any[]; projection: any; path: any }) => React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }

    export const Geographies: React.FC<GeographiesProps>;

    export interface GeographyProps {
        geography: any;
        onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        onMouseMove?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        onMouseDown?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        onMouseUp?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
        className?: string;
        fill?: string;
        stroke?: string;
        strokeWidth?: number | string;
    }

    export const Geography: React.FC<GeographyProps>;

    export interface MarkerProps {
        coordinates: [number, number];
        children?: React.ReactNode;
        onMouseEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        onMouseMove?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        onMouseLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        onMouseDown?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        onMouseUp?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
        className?: string;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
    }

    export const Marker: React.FC<MarkerProps>;
}

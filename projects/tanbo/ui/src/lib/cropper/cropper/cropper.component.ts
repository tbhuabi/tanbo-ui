import { Component, ElementRef, OnInit, ViewChild, Renderer2, Input, Output, EventEmitter } from '@angular/core';

export interface CropResult {
  coordinates: {
    // 裁剪框四角坐标
    leftTopX: number;
    leftTopY: number;
    rightTopX: number;
    rightTopY: number;
    rightBottomX: number;
    rightBottomY: number;
    leftBottomX: number;
    leftBottomY: number;
  };
  scale: number;
}

@Component({
  selector: 'ui-cropper',
  templateUrl: './cropper.component.html'
})
export class CropperComponent implements OnInit {
  @ViewChild('imgRef', {static: true}) imgRef: ElementRef;
  @ViewChild('cropperRef', {static: true}) cropperRef: ElementRef;
  // 裁剪的宽度
  @Input() cropWidth = 200;
  // 裁剪的高度
  @Input()
  cropHeight = 200;
  @Input()
  imageURL = '';
  @Output()
  public uiChange = new EventEmitter<CropResult>();
  // 图片相对容器右上角的偏移量
  imageOffsetX = 0;
  imageOffsetY = 0;
  // 缩放倍数
  scale = 1;
  // 图片缩放比例
  private proportion = 1;
  // 容器宽度
  private containerWidth = 0;
  // 容器高度
  private containerHeight = 0;
  // 图片原始宽度
  private imageOriginWidth = 0;
  // 图片原始高度
  private imageOriginHeight = 0;
  // 计算后的图片宽度
  private imageWidth = 0;
  // 计算后的图片高度
  private imageHeight = 0;
  // 裁剪框四角坐标
  private leftTopX = 0;
  private leftTopY = 0;
  private rightTopX = 0;
  private rightTopY = 0;
  private rightBottomX = 0;
  private rightBottomY = 0;
  private leftBottomX = 0;
  private leftBottomY = 0;
  // 滚轮缩放的解绑函数
  private unbindWheelFn: () => void;
  private imgElement: HTMLImageElement;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.imgElement = this.imgRef.nativeElement;
    this.imgElement.onload = () => {
      // 图片加载成功后布局
      setTimeout(() => {
        this.init();
      }, 1000);
    };
  }

  // 初始化
  init() {
    const cropperElement = this.cropperRef.nativeElement;
    const imgElement = this.imgElement;
    // 获取容器的高和宽
    this.containerWidth = cropperElement.offsetWidth;
    this.containerHeight = cropperElement.offsetHeight;
    // 获取图片的真实高度
    this.imageOriginWidth = imgElement.width;
    this.imageOriginHeight = imgElement.height;
    // 如果图片真实宽度大于容器
    if (this.imageOriginWidth > this.containerWidth) {
      this.proportion = this.containerWidth / this.imageOriginWidth;
      this.imageWidth = this.containerWidth;
      this.imageHeight = this.imageOriginHeight * this.proportion;
      this.imageOffsetX = 0;
      this.imageOffsetY = (this.containerHeight - this.imageHeight) / 2;
    }
    // 如果宽度处理之后图片高度大于容器高度, 对高度进行处理
    if (this.imageHeight > this.containerHeight) {
      this.proportion = this.imageHeight / this.containerHeight;
      this.imageHeight = this.containerHeight;
      this.imageWidth = this.imageWidth * this.proportion;
      this.imageOffsetX = (this.containerWidth - this.imageWidth) / 2;
      this.imageOffsetY = 0;
    }
    imgElement.width = this.imageWidth;
    imgElement.height = this.imageHeight;
  }

  // 计算四角坐标
  computeCoordinates() {
    const cropWidth = this.cropWidth;
    const cropHeight = this.cropHeight;
    const boxLeft = (this.containerWidth - cropWidth) / 2;
    const boxTop = (this.containerHeight - cropHeight) / 2;
    const imageLeft = this.imgElement.offsetLeft;
    const imageTop = this.imgElement.offsetTop;
    this.leftTopX = boxLeft - imageLeft;
    this.leftTopY = boxTop - imageTop;
    this.rightTopX = this.leftTopX + cropWidth;
    this.rightTopY = this.leftTopY;
    this.rightBottomX = this.leftTopX + cropWidth;
    this.rightBottomY = this.rightTopY + cropHeight;
    this.leftBottomX = this.leftTopX;
    this.leftBottomY = this.leftTopY + cropHeight;
    this.uiChange.emit({
      coordinates: {
        leftTopX: this.leftTopX,
        leftTopY: this.leftTopY,
        rightTopX: this.rightTopX,
        rightTopY: this.rightTopY,
        rightBottomX: this.rightBottomX,
        rightBottomY: this.rightBottomY,
        leftBottomX: this.leftBottomX,
        leftBottomY: this.leftBottomY,
      },
      scale: this.scale
    });
  }

  // 移动图片
  moveImage(ev: MouseEvent) {
    let oldX = ev.clientX;
    let oldY = ev.clientY;
    const move = (e: MouseEvent) => {
      const movementX = e.clientX - oldX;
      const movementY = e.clientY - oldY;
      e.preventDefault();
      if (this.imageOffsetX < -this.imageWidth + 20 && e.movementX < 0 ||
        this.imageOffsetX > this.containerWidth - 20 && e.movementX > 0 ||
        this.imageOffsetY < -this.imageHeight + 20 && e.movementY < 0 ||
        this.imageOffsetY > this.containerHeight - 20 && e.movementY > 0) return;
      this.imageOffsetX += movementX;
      this.imageOffsetY += movementY;
      oldX = e.clientX;
      oldY = e.clientY;
      this.computeCoordinates();
    };
    const moveEnd = () => {
      unbindMouseMoveFn();
      unbindMouseUpFn();
    };
    const unbindMouseMoveFn = this.renderer.listen('document', 'mousemove', move);
    const unbindMouseUpFn = this.renderer.listen('document', 'mouseup', moveEnd);
    ev.preventDefault();
  }

  // 缩放图片
  scaleImage() {
    this.unbindWheelFn = this.renderer.listen('document', 'wheel', (e: WheelEvent) => {
      e.preventDefault();
      const change = e.deltaY || e.deltaX;
      const scale = change < 0 ? 1.05 : 0.95;
      this.scale = this.scale * scale;
      this.imageHeight = this.imageHeight * scale;
      this.imageWidth = this.imageWidth * scale;
      this.imgElement.width = this.imageWidth;
      this.imgElement.height = this.imageHeight;
      if (change < 0) {
        this.imageOffsetX -= e.offsetX * 0.05;
        this.imageOffsetY -= e.offsetY * 0.05;
      } else {
        this.imageOffsetX += e.offsetX * 0.05;
        this.imageOffsetY += e.offsetY * 0.05;
      }
      this.computeCoordinates();
    });
  }

  // 停止缩放
  cancelScale() {
    this.unbindWheelFn();
  }
}

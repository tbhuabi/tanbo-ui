import { Component, ElementRef, OnInit, ViewChild, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-cropper',
  templateUrl: './cropper.component.html'
})

export class CropperComponent implements OnInit {
  @ViewChild('imgRef')
  imgRef: ElementRef;
  @ViewChild('cropperRef')
  cropperRef: ElementRef;
  // 裁剪的宽度
  @Input()
  cropWidth: number = 200;
  // 裁剪的高度
  @Input()
  cropHeight: number = 200;
  @Input()
  //tslint:disable
  imageURL: string = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541999609515&di=5fa45be22da52b4a641dac2260a94b66&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F9e3df8dcd100baa1f9fef1e94a10b912c9fc2e95.jpg';
  @Output()
  uiChange = new EventEmitter<object>();
  // 容器宽度
  containerWidth: number = 0;
  // 容器高度
  containerHeight: number = 0;
  // 图片原始宽度
  imageOriginWidth: number = 0;
  // 图片原始高度
  imageOriginHeight: number = 0;
  // 计算后的图片宽度
  imageWidth: number = 0;
  // 计算后的图片高度
  imageHeight: number = 0;
  // 图片缩放比例
  proportion: number = 1;
  // 图片相对容器右上角的偏移量
  imageOffsetX: number = 0;
  imageOffsetY: number = 0;
  // 裁剪框四角坐标
  leftTopX: number = 0;
  leftTopY: number = 0;
  rightTopX: number = 0;
  rightTopY: number = 0;
  rightBottomX: number = 0;
  rightBottomY: number = 0;
  leftBottomX: number = 0;
  leftBottomY: number = 0;
  // 滚轮缩放的解绑函数
  unbindWheelFn: any;


  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.imgRef.nativeElement.onload = () => {
      // 图片加载成功后布局
      setTimeout(() => {
        this.init();
      }, 1000);
    }
  }

  // 初始化
  init() {
    // 获取容器的高和宽
    this.containerWidth = ~~(getComputedStyle(this.cropperRef.nativeElement).width.replace('px', ''));
    this.containerHeight = ~~(getComputedStyle(this.cropperRef.nativeElement).height.replace('px', ''));
    // 获取图片的真实高度
    this.imageOriginWidth = this.imgRef.nativeElement.width;
    this.imageOriginHeight = this.imgRef.nativeElement.height;
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
    this.imgRef.nativeElement.width = this.imageWidth;
    this.imgRef.nativeElement.height = this.imageHeight;
  }
  // 计算四角坐标
  computeCoordinates() {
    const cropWidth = this.cropWidth;
    const cropHeight = this.cropHeight;
    const boxLeft = (this.containerWidth - cropWidth) / 2;
    const boxTop = (this.containerHeight - cropHeight) / 2;
    const imageLeft = Number(getComputedStyle(this.imgRef.nativeElement).left.replace('px', ''));
    const imageRight = Number(getComputedStyle(this.imgRef.nativeElement).left.replace('px', ''));
    this.leftTopX = boxLeft - imageLeft;
    this.leftTopY = boxTop - imageRight;
    this.rightTopX = this.leftTopX + cropWidth;
    this.rightTopY = this.leftTopY;
    this.rightBottomX = this.leftTopX + cropWidth;
    this.rightBottomY = this.rightTopY + cropHeight;
    this.leftBottomX = this.leftTopX;
    this.leftBottomY = this.leftTopY + cropHeight;
    this.uiChange.emit({
      leftTopX: this.leftTopX,
      leftTopY: this.leftTopY,
      rightTopX: this.rightTopX,
      rightTopY: this.rightTopY,
      rightBottomX: this.rightBottomX,
      rightBottomY: this.rightBottomY,
      leftBottomX: this.leftBottomX,
      leftBottomY: this.leftBottomY
    })
  }

  // 移动图片
  moveImage() {
    const move = (e: MouseEvent) => {
      e.preventDefault();
      if (this.imageOffsetX < -this.imageWidth + 20 && e.movementX < 0 ||
        this.imageOffsetX > this.containerWidth - 20 && e.movementX > 0 ||
        this.imageOffsetY < -this.imageHeight + 20 && e.movementY < 0 ||
        this.imageOffsetY > this.containerHeight - 20 && e.movementY > 0) return;
      this.imageOffsetX += e.movementX;
      this.imageOffsetY += e.movementY;
      this.computeCoordinates();
    }
    const moveEnd = () => {
      unbindMouseDownFn();
      unbindMouseMoveFn();
      unbindMouseUpFn();
    }
    const unbindMouseDownFn = this.renderer.listen('document', 'mousedown', (e: MouseEvent) => {
      e.preventDefault();
    });
    const unbindMouseMoveFn = this.renderer.listen('document', 'mousemove', move);
    const unbindMouseUpFn = this.renderer.listen('document', 'mouseup', moveEnd);
  }

  // 缩放图片
  scaleImage() {
    this.unbindWheelFn = this.renderer.listen('document', 'wheel', (e: WheelEvent) => {
      e.preventDefault();
      const change = e.deltaY || e.deltaX;
      let scale;
      scale = change < 0 ? 1.05 : 0.95;
      this.imageHeight = this.imageHeight * scale;
      this.imageWidth= this.imageWidth * scale;
      this.imgRef.nativeElement.width = this.imageWidth;
      this.imgRef.nativeElement.height = this.imageHeight;
      if (change < 0) {
        this.imageOffsetX -= e.offsetX * 0.05;
        this.imageOffsetY -= e.offsetY * 0.05;
      } else {
        this.imageOffsetX += e.offsetX * 0.05;
        this.imageOffsetY += e.offsetY * 0.05;
      }
      this.computeCoordinates();
    })
  }

  // 停止缩放
  cancelScale() {
    this.unbindWheelFn();
  }
}
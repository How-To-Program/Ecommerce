import { useEffect, useRef, useState } from 'react'
import Icon from '../assets/icon.png'

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
// type Props = {
//     src: string
//     className?: string
//     alt?:string
// }
const Image = ({ src, className, alt }) => { // 封装Image懒加载图片组件
  const [upload, setUpload] = useState(true) // 加载中的变量等加载完后变成false
  const [lose, setLose] = useState(true) // 加载失败的变量

  // 对图片元素的引用
  const imgRef = useRef<HTMLImageElement>(null)
  useEffect(() => { // 副作用
    const ob = new IntersectionObserver((entries) => { // 实例化IntersectionObserver
      if (entries[0].isIntersecting) { // 当图片进入到视图
                if(imgRef.current){
                    imgRef.current.src = imgRef.current?.getAttribute('data-src')
                    ob.unobserve(imgRef.current) // 观察者停止对dom的观察
                }
      }
    }, { rootMargin: '100px' })// 让图片提前100px加载
    if(imgRef.current) ob.observe(imgRef.current) // 观察者观察dom
    return () => {
      ob.disconnect() // 停止观察者
    } // 当组件销毁时停止观察者
  }, [])
  return (
        <div className={className}>
            {/* 正在加载时显示的内容 */}
            {
                upload && <div className="image-icon">
                    <Icon type="iconphoto" />
                </div>
            }

            {/* 加载出错时显示的内容 */}
            {
                !lose && <div className="image-icon">
                    <Icon type="iconphoto-fail" />
                </div>
            }

            {/* 加载成功时显示的内容 */}
            {<img
                onl oad={() => { setUpload(false) }} // 图片加载完执行
                one rror={() => setLose(false)} // 图片获取失败执行
                alt={alt}
                data-src={src}
                ref={imgRef} />
            }
        </div>
  )
}

export default Image
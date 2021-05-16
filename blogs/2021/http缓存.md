# 数据传输层面--缓存
* 强缓存
  * <- cache-control: max-age=600
  * <- expires:Mon,14 Sep 2020 09:02:20 GMT
* 协商缓存
  * <- last-modified: Fri, 07 Aug 2020 02:35:59 GMT
  * -> if-modified-since: Fri, 07 Aug 2020 02:35:59 GMT
  * <- etage:W/"5f2cbe0f-2382"
  * -> if-none-match: W/"5f2cbe0f-2382"

# 更快速的网络通信
数据传输层面-压缩
* 数据压缩
  * gzip 与新的br
  * 代码文件压缩
    * HTML/css/js中的注释、空格、长变量名等等
* 静态资源
  * 字体图标，去除元数据，缩小尺寸及分辨率，使用jpg或者webp格式
* 头与报文
  * http1.1 中减少不必要的头
  * 减少cookie数据量

通信协议层面-http2
http2头部压缩：
* 臃肿的请求头
  * 平均460字节首部
* 专门的HPACK压缩算法
  * 索引表
  * 霍夫曼编码

HTTP2 二进制帧
* 文本字符分割的数据流
  * 解析慢且容易出错
* 二进制帧
  * 帧长度
  * 帧类型
  * 帧标识

HTTP2 链路复用

HTTP2 更快速的网络通信
> 头部压缩、二进制帧、链路费用
资源合并和域名分片最好不要做（http2）




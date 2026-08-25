var Config = {
    hex_size: 32,
    tick_duration: 1000 / 1, // 逻辑刻，12刻(6周期)每秒，目前因为debug降频
    max_time_accumulated: 100000,
    camera_speed: 1, // 摄像机移动速度
    storage_stryng_amount_max: {
        "Q": 50,
        "AQ": 100,
        "AAQ": 100,
        "AAQII": 1000,
    },
}
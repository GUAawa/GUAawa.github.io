var Config = {
    version: 1,
    hex_size: 32, // 这只是个初始值，可以被滚轮移动
    zooming_factor: 0.005, // 值越大缩放越轻松
    tick_duration: 1000 / 12, // 逻辑刻，12刻(6周期)每秒，目前因为debug降频
    max_time_accumulated: 100000,
    camera_speed: 1, // 摄像机移动速度
    storage_stryng_amount_max: {
        "AAQII": 1000,
    },
    autosave_interval: 1800, // 单位为tick。1800tick=5分钟
    burn_stryng_tick_pool_max: 600,
    burn_stryng_tick_cost: 18,
}
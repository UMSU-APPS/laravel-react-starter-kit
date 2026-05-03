<?php

use App\Repositories\MenuRepository;
use Illuminate\Support\Facades\Cache;

if (!function_exists('responseError')) {
    function responseError(Exception | string $th)
    {
        $message = 'Terjadi kesalahan, silahkan coba lagi';
        if ($th instanceof \Exception) {
            if (config('app.debug')) {
                $message = $th->getMessage();
                $message .= ' on line ' . $th->getLine() . ' in file ' . $th->getFile();
                $data = $th->getTrace();
            }
        } else {
            $message = $th;
        }

        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors ' => $data ?? null,
        ], 500);
    }
}

if (!function_exists('responseSuccess')) {
    function responseSuccess($isEdit = false)
    {
        return response()->json([
            'status' => 'success',
            'message' => $isEdit ? 'Data berhasil diubah' : 'Data berhasil ditambahkan',
        ]);
    }
}

if (!function_exists('responseSuccessDelete')) {
    function responseSuccessDelete()
    {
        return response()->json([
            'status' => 'success',
            'message' =>  'Data berhasil dihapus',
        ]);
    }
}
